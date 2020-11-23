import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Home, ErrorPage} from '.';

function Main() {
  return (
    <div id="main-comp">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Main;