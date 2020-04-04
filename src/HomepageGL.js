import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { WebGLRenderTarget, Color } from 'three'
import styled from 'styled-components'
import { FeedbackShader } from './FeedbackShader'
import { useMotionValue, useSpring } from 'framer-motion'
import { ResizeObserver } from '@juggle/resize-observer'

const useFrameCount = () => {
  const frameCount = useRef(0)

  useFrame(() => {
    frameCount.current += 1
  }, 1)

  return frameCount
}

const useRender = () => {
  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera)
  }, 100)
}

const usePingPongBuffers = (bufferUniformKey, bufferSize) => {
  const Scene = useRef()
  const Camera = useRef()
  const material = useRef()
  const frame = useFrameCount()

  const buffers = useMemo(() => new Array(2).fill().map(() => new WebGLRenderTarget(bufferSize, bufferSize)), [
    bufferSize
  ])

  useFrame(({ gl }) => {
    if (material.current && Scene.current && Camera.current) {
      if (bufferUniformKey) {
        material.current.uniforms[bufferUniformKey].value = buffers[(frame.current + 1) % 2].texture
      }

      gl.setRenderTarget(buffers[frame.current % 2])
      gl.render(Scene.current, Camera.current)
      gl.setRenderTarget(null)
    }
  }, 2)

  return {
    sceneRef: Scene,
    cameraRef: Camera,
    materialRef: material
  }
}

const Cube = () => {
  const mesh = useRef()
  const { viewport, size } = useThree()
  const cubeY = useSpring(useMotionValue(-viewport.height || -20), { mass: 20, damping: 50 })

  useEffect(() => {
    return cubeY.onChange(v => {
      if (mesh.current) {
        mesh.current.position.y = v
      }
    })
  }, [cubeY, viewport, size])

  useEffect(() => {
    cubeY.set(-1)
  }, [viewport, size, cubeY])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.005
      mesh.current.rotation.z += 0.015
      console.log(mesh.current.position.y)
    }
  }, 2)

  return (
    <mesh ref={mesh} position={[0, -1, 0.1]}>
      <boxBufferGeometry attach="geometry" args={[0.6, 0.6, 0.6]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

const Feedback = ({ children }) => {
  const bufSize = 2048
  const { sceneRef, cameraRef, materialRef } = usePingPongBuffers('uLast', bufSize)
  const frame = useFrameCount()

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new Color('white')
    }
  }, [sceneRef])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
      materialRef.current.uniforms.uFade.value = (frame.current % 2) * 0.002
      materialRef.current.uniforms.uEffect.value = frame.current % 2
    }
  })

  const { size, viewport, camera } = useThree()
  const { width, height } = viewport
  console.log(viewport)

  const renderCam = useMemo(() => camera.clone(), [camera, size])

  return (
    <>
      <primitive object={renderCam} ref={cameraRef} />
      <scene ref={sceneRef}>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[width, height]} />
          <shaderMaterial
            ref={materialRef}
            attach="material"
            args={[FeedbackShader]}
            uniforms-uPixSize-value={[1 / bufSize, 1 / bufSize]}
          />
        </mesh>
        {children}
      </scene>
    </>
  )
}

const GL = () => {
  useRender()
  return (
    <group position={[0, 0, 0]}>
      <Feedback>
        <Cube />
      </Feedback>
    </group>
  )
}

const HomepageGL = () => {
  return (
    <Container>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        noEvents
        resize={{ scroll: false, polyfill: ResizeObserver }}
        gl={{
          depth: false,
          powerPreference: 'high-performance',
          stencil: false
        }}
      >
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
  z-index: -1;
`

export { HomepageGL }
