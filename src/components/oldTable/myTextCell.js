import React, { Component } from 'react';
import {Cell} from 'fixed-data-table-2';

const MyTextCell = (props) => {
    return (
        <Cell>
            {props.name}
        </Cell>
    );
}


export default MyTextCell;