import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './SignUp.css';
import { Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: '',
      email: 'mon@email.com',
      password: 'monPassw0rd',
      name: 'James',
      lastname: 'Bond',
      open: false,
    };
  }

  updateField = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };

  getData = () => {
    const { flash, open, ...user } = this.state;
    console.log(user);
    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(
        (res) => this.setState({ flash: res.flash }),
        (err) => this.setState({ flash: err.flash }),
      );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ open: true });
    this.getData();
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.props.history.push('/');
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
          <p>name</p>
          <TextField
            className="form"
            type="text"
            name="name"
            onChange={this.updateField}
          />
          <p>lastname</p>
          <TextField
            className="form"
            type="text"
            name="lastname"
            onChange={this.updateField}
          />
          <Button
            className="button"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
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
          <Link className="" to="/signin">
            Sign In
          </Link>
        </form>
      </>
    );
  }
}

export default SignUp;
