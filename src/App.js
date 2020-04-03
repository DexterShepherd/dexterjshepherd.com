import React from 'react'
import styled from 'styled-components'
import { Flower } from './Flower'

function App() {
  return (
    <Container>
      <Flower />
      {/* <Title>Dexter J Shepeherd</Title> */}
      {/* <Paragraph>Hello.</Paragraph> */}
      {/* <Paragraph>I'm a front end developer and graphics programmer based in Los Angeles CA.</Paragraph> */}
      {/* <Paragraph></Paragraph> */}
    </Container>
  )
}

const Paragraph = styled.p``

const Title = styled.h1`
  margin: 0;
`

const Container = styled.div`
  background: #fff;
  margin: 0;
  font-family: 'IBM Plex Mono', monospace;
  min-height: 100vh;
`

export default App
