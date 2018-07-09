import React from 'react';

const Result = (props) => {
    if (props.link === '')
        return (
            <p>No link yet...</p>
        );
    else {
        return (
            <a href={props.link} target='_blank'>{props.link}</a>
        );
    }};

export default Result;