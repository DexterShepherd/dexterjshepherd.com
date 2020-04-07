import { useRef, useMemo, useEffect, useCallback } from 'react'
import { WebGLRenderTarget } from 'three'
import { useFrame } from 'react-three-fiber'
import { useMotionValue, useSpring } from 'framer-motion'

export const useFrameCount = () => {
  const frameCount = useRef(0)

  useFrame(() => {
    frameCount.current += 1
  }, 1)

  return frameCount
}

export const useRender = () => {
  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera)
  }, 100)
}

export const usePingPongBuffers = (bufferUniformKey, bufferSize) => {
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

export const useMouse = (springConfig = {}) => {
  const screenMouseX = useSpring(useMotionValue(0), springConfig)
  const screenMouseY = useSpring(useMotionValue(0), springConfig)
  const mouseX = useSpring(useMotionValue(0), springConfig)
  const mouseY = useSpring(useMotionValue(0), springConfig)

  const onMouseMove = useCallback(
    evt => {
      screenMouseX.set(evt.clientX)
      screenMouseY.set(evt.clientY)
      mouseX.set(evt.clientX / window.innerWidth)
      mouseY.set(evt.clientY / window.innerHeight)
    },
    [mouseX, mouseY, screenMouseX, screenMouseY]
  )

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)

    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  return { screenMouseX, screenMouseY, mouseX, mouseY }
}

export const useUpdate = (value, callback) => {
  useEffect(() => {
    return value.onChange(callback)
  }, [value, callback])
}
