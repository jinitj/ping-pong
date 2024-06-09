import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';

import Shell from './Shell';
import Chat from './components/Chat';
import Game from '../src/pages/Game';
import Admin from '../src/pages/Admin'

const App = () => {
  return (
    <BrowserRouter>
      <Shell>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage />}
          />
          <Route
            exact
            path="/chat"
            render={() => <Chat />}
          />
          <Route
            exact
            path="/game"
            render={() => <Game />}
          />
          <Route
            exact
            path="/admin"
            render={() => <Admin />}
          />
        </Switch>
      </Shell>
    </BrowserRouter>
  );
};

export default App;