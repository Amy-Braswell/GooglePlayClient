import React, { Component } from 'react';
// import './App.css';
import GoogleApp from './googleApp/googleApp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      genres: [],
      search: '',
      sort: '',
      error: null
    }
  }

  setGenres(genres) {
    this.setState({
      genres
    });
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if(this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    if(this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get books at this time.'
        });
      })

  }

  render() {
    const apps = this.state.apps.map((app, i) => {
      return <GoogleApp {...app} key={i}/>
    })
    return (
      <main className="App">
        <h1>Google Play Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search by Keyword: </label>
            <input 
              type="text" 
              id="search" 
              name="search" 
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}
            />

            <br/>

            <label htmlFor="genres">Search by Genre: </label>
            <select id="genres" name="genres" onChange={e => this.setGenres(e.target.value)}>
              <option value="">All</option>
              <option value="action">Action</option>
              <option value="arcade">Arcade</option>
              <option value="card">Card</option>
              <option value="casual">Casual</option>
              <option value="puzzle">Puzzle</option>
              <option value="strategy">Strategy</option>
            </select> 

            <br/>

            <label htmlFor="sort">Sort By: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="app">App</option>
              <option value="rating">Rating</option>
            </select>  
            <button type="submit">Search</button>  
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;