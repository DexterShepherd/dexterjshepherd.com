import React from 'react'
import styled from 'styled-components'
import { HomepageGL } from './HomepageGL'
import { HomepageContent } from './HomepageContent'
import { BrowserView } from 'react-device-detect'

function App() {
  return (
    <Container>
      <BrowserView>
        <HomepageGL />
      </BrowserView>
      <HomepageContent />
    </Container>
  )
}

const Container = styled.div`
  margin: 0;
  min-height: 100vh;
`

export default App
