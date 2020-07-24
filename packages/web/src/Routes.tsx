import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Todos } from './pages/Todos'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/todos/:userid'} component={Todos} />
        <Route render={() => Home()} />
      </Switch>
    </BrowserRouter>
  )
}
