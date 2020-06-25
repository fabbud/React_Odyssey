import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import '../SignUp/SignUp.css';
import { Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: '',
      email: 'mon@email.com',
      password: 'monPassw0rd',
      open: false,
    };
  }

  updateField = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const formInput = JSON.stringify(this.state);

    return (
      <>
        <h6>{formInput}</h6>
        <form onSubmit={this.handleSubmit}>
          <p>email</p>
          <TextField
            className="form"
            type="email"
            name="email"
            onChange={this.updateField}
          />
          <p>password</p>
          <TextField
            className="form"
            type="password"
            name="password"
            onChange={this.updateField}
          />
          <Button className="button">
            <Link className="" to="/profile">
              Submit
            </Link>
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={this.state.flash}
            action={
              <React.Fragment>
                <Button
                  className="button"
                  color="secondary"
                  size="small"
                  onClick={this.handleClose}
                >
                  UNDO
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </form>
        <Link className="" to="/signup">
          Sign Up
        </Link>
      </>
    );
  }
}

export default SignIn;
