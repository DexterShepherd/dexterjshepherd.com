import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { WebGLRenderTarget, PerspectiveCamera, Scene, LinearFilter, NearestFilter, Color } from 'three'
import SimpleNoiseConstructor from 'simplex-noise'
import styled from 'styled-components'
import { glNoise2d } from './Shaders'

const noise = new SimpleNoiseConstructor()

const shader = {
  uniforms: {
    uPos: { type: 'vec2', value: [0, 0] },
    uLast: { type: 'texture' },
    uTime: { type: 'f', value: 0.0 },
    uFade: { type: 'f', value: 0.0 },
    uEffect: { type: 'f', value: 0.0 },
    uPixSize: { type: 'vec2', value: [1.0, 1.0] }
  },
  vertexShader: `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec2 vUv;
  uniform sampler2D uLast;
  uniform float uTime;
  uniform float uFade;
  uniform vec2 uPixSize;
  uniform float uEffect;

  ${glNoise2d}



  float movementSpeed = 0.15;

  void main() {

    vec2 cameraMove = vec2(
      snoise(vec3(0.5, 0.5, uTime * movementSpeed)),
      snoise(vec3(0.0, 0.5, uTime * movementSpeed))
    ) * 0.002;

    vec2 st = vUv; 

    st -= vec2(0.5);
    
    st += cameraMove;

    st *= 1.0 + (snoise(vec3(0.1, 0.1, uTime * movementSpeed)) * 0.003);
    st += vec2(0.5);


    vec4 last = texture2D(uLast, st);
    vec4 c = last;
    c.a -= uFade;

    
    float h = uPixSize.x;
    vec4 sum = vec4(0.0);

    h *= 2.0 * snoise(vec3(st * 4.0, uTime * 0.1));

    if ( uEffect > 0.5 ) {
      // blur

      sum += texture2D(uLast, st + (vec2(-1.0, -1.0) * h)) * 1.0;
      sum += texture2D(uLast, st + (vec2(0.0, -1.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(1.0, -1.0) * h)) * 1.0;
      sum += texture2D(uLast, st + (vec2(-1.0, 0.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(0.0, 0.0) * h)) * 4.0;
      sum += texture2D(uLast, st + (vec2(1.0, 0.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(-1.0, 1.0) * h)) * 1.0;
      sum += texture2D(uLast, st + (vec2(0.0, 1.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(1.0, 1.0) * h)) * 1.0;

      sum /= 16.0;

    } else {
      // sharpen
      
      sum += texture2D(uLast, st + (vec2(0.0, -1.0) * h)) * -1.5;
      sum += texture2D(uLast, st + (vec2(-1.0, 0.0) * h)) * -0.5;
      sum += texture2D(uLast, st + (vec2(0.0, 0.0) * h)) * 5.0;
      sum += texture2D(uLast, st + (vec2(1.0, 0.0) * h)) * -1.5;
      sum += texture2D(uLast, st + (vec2(0.0, 1.0) * h)) * -0.5;
    }

    c.xyz = sum.xyz;

    gl_FragColor = c;
  }
  `
}

const ReadShader = {
  vertexShader: `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
  `
}

const BufferRender = () => {
  const mat = useRef()

  // useFrame(() => {
  // })
  //
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[4, 4]} />
      <shaderMaterial ref={mat} attach="material" args={[ReadShader]} />
    </mesh>
  )
}

const EllipseBuffer = ({ buffers }) => {
  const mat = useRef()
  const mesh = useRef()
  const noiseSpeed = 0.2
  const bufferIndex = useRef(0)

  const { size } = useThree()

  const bufferScene = useRef()
  const camera = useRef()

  useEffect(() => {
    if (bufferScene.current) {
      bufferScene.current.background = new Color('white')
    }
  }, [bufferScene])

  useFrame(({ gl, clock }) => {
    if (mat.current) {
      mat.current.uniforms.uPos.value[0] = noise.noise2D(clock.elapsedTime * noiseSpeed, 0) * 0.5
      mat.current.uniforms.uPos.value[1] = noise.noise2D(clock.elapsedTime * noiseSpeed, 1) * 0.5
      mat.current.uniforms.uLast.value = buffers[Number(!bufferIndex.current)].texture
      mat.current.uniforms.uTime.value = clock.elapsedTime
      mat.current.uniforms.uFade.value = bufferIndex.current * 0.002
      mat.current.uniforms.uEffect.value = bufferIndex.current
    }

    if (mesh.current) {
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.005
      mesh.current.rotation.z += 0.015
    }

    gl.setRenderTarget(buffers[bufferIndex.current])
    gl.render(bufferScene.current, camera.current)
    gl.setRenderTarget(null)

    bufferIndex.current = Number(!bufferIndex.current)
  }, 99)

  return (
    <>
      <orthographicCamera ref={camera} position={[0, 0, 1]} left={-2} right={2} top={-2} bottom={2} />
      <scene ref={bufferScene}>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[2, 2]} />
          <shaderMaterial ref={mat} attach="material" args={[shader]} uniforms-uPixSize-value={[1 / 2048, 1 / 2048]} />
        </mesh>
        <mesh ref={mesh} position={[0, 0, 0.1]}>
          <boxBufferGeometry attach="geometry" args={[0.2, 0.2, 0.2]} />
          <meshNormalMaterial attach="material" />
        </mesh>
      </scene>
    </>
  )
}

const GL = () => {
  const mat = useRef()
  const { size } = useThree()

  const bufferIndex = useRef(0)

  const buffers = useMemo(() => new Array(2).fill().map(() => new WebGLRenderTarget(2048, 2048)), [])

  useFrame(({ gl, scene, camera }) => {
    if (mat.current) {
      mat.current.map = buffers[bufferIndex.current].texture
    }

    gl.render(scene, camera)
    bufferIndex.current = Number(!bufferIndex.current)
  }, 100)

  return (
    <>
      <group position={[0, 0, 0]} scale={[3, 3, 3]}>
        <EllipseBuffer buffers={buffers} />
      </group>
      <group position={[-3, 0, 0]}>
        {/* <mesh> */}
        {/*   <planeBufferGeometry attach="geometry" args={[4, 4, 1]} /> */}
        {/*   <meshBasicMaterial ref={mat} attach="material" /> */}
        {/* </mesh> */}
      </group>
    </>
  )
}

const Flower = () => {
  return (
    <Container>
      <Canvas pixelRatio={window.devicePixelRatio}>
        <GL />
      </Canvas>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

export { Flower }
