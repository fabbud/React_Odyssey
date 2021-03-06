import React from 'react';
import SignUp from './component/SignUp/SignUp';
import { MuiThemeProvider, Grid, Paper } from '@material-ui/core';
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
                  <SignUp />
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
