import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './container/SignUp/SignUp';
import SignIn from './container/SignIn/SignIn';
import Profile from './container/Profile/Profile';
import { MuiThemeProvider, Grid, Paper } from '@material-ui/core';
import requireAuth from './hoc/requireAuth';
import requireNotAuth from './hoc/requireNotAuth';
import './App.css';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: '100%' }}>
          <Grid item xs={12}>
            <Paper elevation={4} style={{ margin: 32 }}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6} style={{ 'text-align': 'center' }}>
                  <img
                    src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
                    alt="Homer"
                  />
                </Grid>
                <Grid item xs={12} sm={6} alignContent="center">
                  <BrowserRouter>
                    <Switch>
                      <Redirect exact from="/" to="/profile" />
                      <Route
                        exact
                        path="/signin"
                        component={requireNotAuth(SignIn)}
                      />
                      <Route
                        exact
                        path="/signup"
                        component={requireNotAuth(SignUp)}
                      />
                      <Route
                        exact
                        path="/profile"
                        component={requireAuth(Profile)}
                      />
                    </Switch>
                  </BrowserRouter>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
