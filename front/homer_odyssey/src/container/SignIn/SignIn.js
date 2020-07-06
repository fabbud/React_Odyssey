import React from 'react';
import { connect } from 'react-redux';
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
    const { flash, open, ...user } = this.state;
    e.preventDefault();
    fetch('/auth/signin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.props.dispatch({
          type: 'CREATE_SESSION',
          user: res.user,
          token: res.token,
          message: res.message,
        });
        this.setState({ flash: this.props.flash });
      })
      .catch((err) => this.setState({ flash: err.message }))
      .then(this.setState({ open: true }));
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
    this.props.history.replace('/');
  };

  render() {
    const formInput = JSON.stringify(this.state);
    console.log(this.props.flash);
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
          <Button type="submit" className="button">
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
        </form>
        <Link className="" to="/signup">
          Sign Up
        </Link>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    flash: state.auth.token,
  };
}

export default connect(mapStateToProps)(SignIn);
