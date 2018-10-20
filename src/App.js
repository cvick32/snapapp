import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const appId = "156ae7d2f43eaa131de11166c97f05b8b1b54d066f11279a3358ed8f8ff0e657";
const endPoint = "https://api.unsplash.com/photos/random?count=25&client_id=" + appId;

export default class App extends Component {

  state = {
      images : []
  };

  query = '';
  trackQuery = this.trackQuery.bind(this);
  search = this.search.bind(this);
   

  trackQuery(ev) {
    this.query = ev.target.value;
  }

  search() {
    fetch(`${endPoint}&query=${this.query}`)
      .then(response => {
        return response.json()
      }).then(responseJson => {
        this.setState({
          images : responseJson
        })
      })
  }

  displayImages() {
    var keyVal = 0;
    return this.state.images.map(image => {
      return <img src={image.urls.thumb} />
    })
  }

  render() {
    return (
      <div className="App">     
        <input type="text" onChange={this.trackQuery} /><br />
        <button onClick={this.search}>Search</button>
        <div className="container">
          {this.displayImages()}  
        </div>
      </div>
    );
  }
}


