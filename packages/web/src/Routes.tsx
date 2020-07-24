import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Todos } from './pages/Todos'
import { Register } from './pages/Register'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/register'} component={Register} />
        <Route path={'/todos/:userid'} component={Todos} />
        <Route render={() => Home()} />
      </Switch>
    </BrowserRouter>
  )
}
