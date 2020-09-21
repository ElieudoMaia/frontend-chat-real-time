import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Join from './components/Join'
import Chat from './components/Chat'

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Join} />
            <Route path='/chat' exact component={Chat} />
        </Switch>
    </BrowserRouter> 
)

export default App