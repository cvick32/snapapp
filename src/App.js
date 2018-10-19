import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


// ES Modules syntax
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "156ae7d2f43eaa131de11166c97f05b8b1b54d066f11279a3358ed8f8ff0e657",
  secret: "a17246ffd05658d87fe33a64db8bee9942cb137ac0524427aef75406d0653190",
  callback: "https://snapapp-app.herokuapp.com/"
});


const login = () => {
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    'public',
    'read_user',
    'write_likes',
  ]);

  window.location.assign(authenticationUrl);
};

const authenticateFromCode = ({ code }) => {
  unsplash.auth
    .userAuthentication(code)
    .then(toJson)
    .then(json => {
      // Set it in localstorage, so that we can use it next time
      unsplash.auth.setBearerToken(json.access_token);
    });
};

login();

unsplash.photos.listPhotos(1, 10)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>  </h1>
          <img src={logo} className="App-logo" alt="logo" />
  
        </header>

        <div class="slideshow-container">
          

          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
      </div>
    );
  }
}

export default App;
