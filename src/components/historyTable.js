import React, { Component } from 'react';
import HistoryList from './historyList';

var api = require('../utils/api');

class HistoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHistory: ''
        };
    }

    getHistory() {
        /* Uses API to get history from Blob */
        api.fetchHistory()
        .then(function(response) {
            this.setState(function () {
                return {
                    currentHistory: response
                }
            })
            this.props.onSearchHistory(response);
        }.bind(this));
    }

    render () {
        if (this.props.searchHistory === undefined || this.props.searchHistory.length === 0){
            // When checking for the first time searchHistory is undefined, changes to ''.
            this.getHistory();
        }

        return (
            <HistoryList
                data = {this.props.searchHistory}/>
        )
    }
    
}

export default HistoryTable;