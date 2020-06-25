import React from 'react';
import './SignUp.css';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: '',
      email: 'mon@email.com',
      password: 'monPassw0rd',
      name: 'James',
      lastname: 'Bond',
    };
  }

  updateField = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };

  getData = () => {
    const { flash, ...user } = this.state;
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
    this.getData();
  };

  render() {
    const formInput = JSON.stringify(this.state);
    return (
      <>
        <h1>{formInput}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form"
            type="email"
            name="email"
            onChange={this.updateField}
          />
          <input
            className="form"
            type="password"
            name="password"
            onChange={this.updateField}
          />
          <input
            className="form"
            type="text"
            name="name"
            onChange={this.updateField}
          />
          <input
            className="form"
            type="text"
            name="lastname"
            onChange={this.updateField}
          />
          <input className="form" type="submit" name="email" value="Submit" />
        </form>
      </>
    );
  }
}

export default SignUp;
