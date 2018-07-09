import React, { Component } from 'react';
import SearchButton from './searchButton';

class SearchBox extends Component {

    constructor(props){
        super(props);
        this.state={ 
            value: '',
            link: '' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({value});
    }

    handleClick() {
        this.props.searchFunc(this.state.value);
    }

    render() {
        return (
            <div className="search-box col">
                <span className="box col-md-8">
                    <input className="form-control searchBox" type="text"
                        onChange={this.handleChange}/>
                </span>
                <span className="button col-md-4">
                    <SearchButton
                        onClick = {() => {
                            this.handleClick()}}/>
                </span>
            </div>
                
        );
    }

    onSearchChange(value){
        this.setState({value});
    }
}

export default SearchBox;