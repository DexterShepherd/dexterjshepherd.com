import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { Color } from 'three'
import { useTransform } from 'framer-motion'
import { Canvas, useThree, useFrame } from 'react-three-fiber'
import { usePingPongBuffers, useRender, useFrameCount, useMouse, useUpdate } from './hooks'

export const Shader = {
  uniforms: {
    uLast: { type: 'texture' },
    uMouse: { type: 'vec2', value: [0.5, 0.5] }
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
  uniform vec2 uMouse;

  void main() {
    vec2 st = vUv; 

    st -= vec2(0.5);
    st *= 1.001;
    st += vec2(0.5);


    vec4 last = texture2D(uLast, st);
    last.a -= 0.001;

    
    vec4 a = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 b = last;
    vec4 c = mix(a, b, smoothstep(0.05, 0.051, distance(uMouse, vUv)));

    gl_FragColor = c;
  }
  `
}

const Feedback = ({ children }) => {
  const bufSize = 1024
  const { sceneRef, cameraRef, materialRef } = usePingPongBuffers('uLast', bufSize)
  const frame = useFrameCount()
  const { mouseX, mouseY: rawMouseY } = useMouse({ restSpeed: 0.001, mass: 0.1, damping: 100 })

  const mouseY = useTransform(rawMouseY, [0, 1], [1, 0])

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new Color('white')
    }
  }, [sceneRef])

  useUpdate(mouseX, v => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value[0] = v
    }
  })

  useUpdate(mouseY, v => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value[1] = v
    }
  })

  // useFrame(() => {
  //   if (materialRef.current) {
  //     materialRef.current.uniforms.uMouse.value = [mouseX.get(), mouseY.get()]
  //   }
  // })

  const { size, viewport, camera } = useThree()
  const { width, height } = viewport

  const renderCam = useMemo(() => camera.clone(), [camera, size])

  return (
    <>
      <primitive object={renderCam} ref={cameraRef} />
      <scene ref={sceneRef}>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[width, height]} />
          <shaderMaterial ref={materialRef} attach="material" args={[Shader]} />
        </mesh>
        {children}
      </scene>
    </>
  )
}

const GL = () => {
  useRender()
  return <Feedback />
}

const Sketch = () => {
  return (
    <Container>
      <Canvas>
        <GL />
      </Canvas>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
`

export { Sketch }
