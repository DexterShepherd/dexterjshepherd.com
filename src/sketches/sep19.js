import React from 'react'
import styled from 'styled-components'
import { Canvas } from 'react-three-fiber'

const GL = () => {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}
const Sketch = () => {
  return (
    <Container>
      {/* <Canvas> */}
      {/*   <GL /> */}
      {/* </Canvas> */}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  border: 2px solid red;
`

export { Sketch }
