import React, { Component } from 'react';
import {Cell} from 'fixed-data-table-2';

const MyLinkCell = (props) => {
    return (
        <Cell>
            <a href={props.link} target='_blank'>{props.link}</a>
        </Cell>
    );
}


export default MyLinkCell;