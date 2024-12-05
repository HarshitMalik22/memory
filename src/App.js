import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Signin from './components/pages/Signin';
import Register from './components/pages/Register';
import Game from './components/pages/Game';

import HistoryState from './context/history/HistoryState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

// Set token if available in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const isAuthenticated = !!localStorage.token;

  return (
    <AuthState>
      <HistoryState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="Routes">
              <Switch>
                {/* Public routes */}
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/register" component={Register} />

                {/* Conditionally render Home or redirect to Signin */}
                <Route exact path="/">
                  {isAuthenticated ? <Home /> : <Redirect to="/signin" />}
                </Route>

                {/* Conditionally render Game or redirect to Signin */}
                <Route exact path="/game">
                  {isAuthenticated ? <Game /> : <Redirect to="/signin" />}
                </Route>

                {/* Catch-all route to redirect to Signin */}
                <Route render={() => <Redirect to="/signin" />} />
              </Switch>
            </div>
          </div>
        </Router>
      </HistoryState>
    </AuthState>
  );
};

export default App;
