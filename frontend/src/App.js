import React, { useContext, useEffect } from 'react'

import { Switch, Route } from 'react-router-dom'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Home from 'pages/Home'

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
