import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    clickCount: 0,
    username: '',
  }

  componentDidMount() {
    this.getCount();
    this.getUsername();
  }

  handleClick = () => {
    axios.post('/add-click')
      .then(() => this.getCount())
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  getCount = () => {
    axios.get('/get-clicks')
      .then(response => {
        this.setState({
          clickCount: response.data.totalClicks,
        });
      })
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  saveUsername = () => {
    axios.post('/login', {username: this.state.username})
    .then(() => this.getUsername())
    .catch(error => {
      console.log('error making add click post', error);
    });

  }

  handleNameChange = (event) => {
    this.setState({
      username: event.target.value,
    });console.log(this.state.username);
}

getUsername = () => {
  axios.get('/login')
    .then(response => {
      this.setState({
        username: response.data.username,
      });
    })
    .catch(error => {
      console.log('error making add click post', error);
    });
}

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          {this.state.username}
          <div>
            {/* Username should go here */}
            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {this.state.usernameIsEditable ?
            <div>
             <form method="post" action="/login">
              <input type="text" id="user" name="user" placeholder="user name" onChange={this.handleNameChange} />
            </form>
              <button onClick={this.saveUsername}>Save Username</button> </div>:
              <button onClick={this.editUsername}>Edit Username</button>
              
            }
          </div>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
