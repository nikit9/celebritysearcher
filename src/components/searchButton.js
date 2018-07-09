import React from 'react';

const SearchButton = (props) => {
    return (
        <button type="button" className="btn btn-primary"
            onClick={props.onClick}>Search</button>
    )};

export default SearchButton;