import React, { Component } from 'react';
import './App.css';

const appId = "156ae7d2f43eaa131de11166c97f05b8b1b54d066f11279a3358ed8f8ff0e657";
const endPoint = "https://api.unsplash.com/photos/random?count=25&client_id=" + appId;

export default class App extends Component {

  state = {
      images : [],
      hasError: false,
      errorMessage : ""
  };

  query = '';
  trackQuery = this.trackQuery.bind(this);
  search = this.search.bind(this);
   
  trackQuery(ev) {
    this.query = ev.target.value;
  }

  search() {
    this.setState({ hasError : false, errorMessage : ""});
    fetch(`${endPoint}&query=${this.query}`)
      .then(response => {
        if (!response.ok) {
          this.setState({
            hasError : true,
            errorMessage : response.status
          });
        } else {
          return response.json()
        }
      }).then(responseJson => {
        if (this.state.hasError) {
          return;
        } else {
          this.setState({
            images : responseJson
          })
        }
      })
  }

  displayImages() {
    console.log(this.state);
    if (this.state.hasError) {
      return <h1> Something went wrong: <br/> {this.state.errorMessage}</h1>
    } else {
      return this.state.images.map(image => {
        return ( 
          <figure key={image.id} class="imageInfo">
            <img key={image.id} src={image.urls.thumb} />
            <a href={image.user.links.html}><figcaption>{image.user.username}</figcaption></a>
          </figure>
          );
      })
    }
  }

  render() {
    return (
      <div className="App">     
        <link href="https://fonts.googleapis.com/css?family=Niramit" rel="stylesheet" />
        <header>
          <h1>Cole Vick <br/> SnapApp Project</h1>
        </header>
        <input type="text" onChange={this.trackQuery} /><br />
        <button onClick={this.search}>Search</button>
        <div className="container">
          {this.displayImages()}  
        </div>
      </div>
    );
  }
}