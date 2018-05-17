import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Images from './Components/images'
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
require('dotenv').config();


const key = process.env.REACT_APP_MY_KEY
const url = `https://api.themoviedb.org/3/list/1?api_key=${key}`


class App extends Component {

  state={
    items:[],
    isLoading: true
  }

  
componentDidMount() {
  this.callApi()
    .then(res => this.setState({ items: res.items, isLoading: false }))
    .catch(err => console.log(err));
}

callApi = async () => {
      
  const response = await fetch(url);
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};
  render() {

    if(this.state.isLoading) {
      return ( 
      <CircularProgress style={{ color: purple[500]}} thickness={7} />
)
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         <Images items={this.state.items}/>
       
       
      </div>
    );
  }
}

export default App;
