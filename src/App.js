import React, { Component } from 'react';
import {withCookies, Cookies } from 'react-cookie';
import uuidv4 from 'uuid/v4';
import { instanceOf } from 'prop-types';

import './css/App.css';
import './css/bootstrap.min.css';
import logo from './instagram-logo-small.png';

import SearchBox from './components/searchBox';
import HistoryTable from './components/historyTable';
import Result from './components/result';

var api = require('./utils/api');

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.history = [];

    this.handleHistory = this.handleHistory.bind(this);
    this.search = this.search.bind(this);

    this.state = { 
      id: '',
      link: '',
      term: '',
      searchHistory: undefined
    };

  }

  componentWillMount() {
    // Give each user a container of its own (named uuid).
    // Save uuid in cookies so we can use it again next time
    const { cookies } = this.props;
    const id = cookies.get('id') || '';

    if (id !== '') {
      this.setState({id: cookies.get('id')});
    } 
    else {
      // Assign id as doesn't have one saved in cookies.
      const uuid = uuidv4();
      cookies.set('id', uuid);
      this.setState({id: uuid});
    }
  }

  search(celeb) {
    /* Uses Bing to search for celeb's instagram
       Updates history and link accordingly. */
    api.searchBing(celeb + " instagram")
      .then(function(res) {
        this.setState({link: res, term: celeb}, () => {
          var history;
          if (this.state.searchHistory) {
            history = this.state.searchHistory.slice();
          }
          else {
            history = [];
            this.setState({searchHistory: []});
          }
          var addition = JSON.parse('{"term": "' + celeb + '", "link": "' + res + '"}');
          if (history === '')
            history = [addition];
          else
            history.push(addition);

          this.setState({searchHistory: history.slice()}, () => {
          });
          api.saveHistory(this.state.id, JSON.stringify(history));
        });
        
      }.bind(this));
  }

  handleHistory(history) {
    this.setState({searchHistory: history.slice()});
  }

  render() {
    return (
      <div className="App">

        <div className="header">
            <p> Niki's Instagram Searcher </p>
            <div className="header-intro">
              <p> ~ Enter something witty that will make them hire me here ~ </p>
            </div>
        </div>
        <hr/>

        <div className="App-body">

          <div className="instructions">
            <div className="header">
              <p>Instructions</p>
            </div>
            <div className="instructions-data">
              <p>Welcome to my amazing Instagram Celebrity Searcher!</p>
              <p>Enter your favorite celebrity's name in the search box below, hit the button, kick back
                and enjoy :)</p>
              <p>You can find a history of your searches at the bottom of the page.</p>
            </div>
          </div>

          <div className="search-and-results col">

            <span className="search col-lg-6">
              <div className="header">
                <p>Search</p>
                <hr/>
              </div>
              <div className="search-data">
                <SearchBox
                  searchFunc = {(celeb) => {
                    this.search(celeb)}}/>
              </div>
            </span>

            <span className="results col-lg-6">
              <div className="header">
                <p>Results</p>
                <hr/>
              </div>
              <div className="results-link col">
                <span className="instaLogo col-md-1">
                  <img src={logo} alt="instagram"/>
                </span>
                <span className="resultSpan col-md-11">
                  <Result
                    link = {this.state.link}/>
                </span>
              </div>
            </span>

          </div>

          <div className="history">
            <div className="header">
              <p>History</p>
              <hr/>
            </div>
            <div className="history-table">
              <HistoryTable
                id = {this.state.id} searchHistory={this.state.searchHistory} onSearchHistory={this.handleHistory}/>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default withCookies(App);
