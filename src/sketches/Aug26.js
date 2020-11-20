import React from 'react'
import { Canvas, useUpdate } from 'react-three-fiber'
import styled from 'styled-components'
import { Sky, OrbitControls } from 'drei'

const Ground = () => {
  return (
    <group scale={[6, 6, 6]}>
      <mesh rotation={[0, 0, 0]} scale={[1, 0.01, 1]}>
        <boxBufferGeometry attach="geometry" args={[1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  )
}

const Tree = () => {
  const ref = useUpdate(g => {
    console.log(g)
  })
  return (
    <group>
      <mesh position={[0, 1.5, 0]}>
        <boxBufferGeometry ref={ref} attach="geometry" args={[0.5, 3, 0.5, 4, 10, 2]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  )
}

const Scene = () => {
  return (
    <>
      <Sky distance={450000} sunPosition={[0, 1, 0]} />
      <Tree />
      <Ground />
    </>
  )
}

const Sketch = () => {
  return (
    <Container>
      <Canvas colorManagement camera={{ position: [4, 4, 8] }}>
        <OrbitControls />
        <Scene />
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
