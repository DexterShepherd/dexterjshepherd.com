import React from 'react'
import styled from 'styled-components'
import { HomepageGL } from './HomepageGL'
import { HomepageContent } from './HomepageContent'

function App() {
  return (
    <Container>
      <HomepageGL />
      <HomepageContent />
    </Container>
  )
}

const Container = styled.div`
  margin: 0;
  min-height: 100vh;
`

export default App
