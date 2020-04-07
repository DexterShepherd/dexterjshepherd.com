import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './Home'
import styled from 'styled-components'
import { Viewer } from './sketches/Viewer'

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/sketch" component={Viewer} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Container>
    </Router>
  )
}

const Container = styled.div`
  margin: 0;
  min-height: 100vh;
`

export default App
