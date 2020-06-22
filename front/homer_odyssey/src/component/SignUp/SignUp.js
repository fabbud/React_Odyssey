import React from 'react';
import './SignUp.css';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'mon@email.com',
      password: 'monPassw0rd',
      firstname: 'James',
      lastname: 'Bond',
    };
  }

  updateField = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
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
            name="firstname"
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
