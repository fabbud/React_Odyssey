import React, { Component } from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: 'homer.simpson@wildcodeschool.fr',
        name: 'Homer',
        lastname: 'Simpson',
      },
    };
  }
  render() {
    const { email, name, lastname } = this.state.profile;
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText primary="email" secondary={email} />
            <ListItemText primary="text" secondary={name} />
            <ListItemText primary="email" secondary={lastname} />
          </ListItem>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            name="submit"
          >
            <Link className="" to="/signin">
              Sign Out
            </Link>
          </Button>
        </List>
      </div>
    );
  }
}
export default Profile;
