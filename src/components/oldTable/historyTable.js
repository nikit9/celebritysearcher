import React, { Component } from 'react';
import MyTextCell from './myTextCell';
import MyLinkCell from './myLinkCell';
import {Table, Column, Cell} from 'fixed-data-table-2';

var api = require('../utils/api');

class HistoryTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    render() {
        return (
            <div className="historyTable">
                <Table 
                    rowsCount = {this.state.data.length}
                    rowHeight = {50}
                    headerHeight = {50}
                    width = {400}
                    maxHeight = {1500}>
                    <Column
                        header = {<Cell>Name</Cell>}
                        cell = {this.state.data.map((item) => {
                            <MyTextCell 
                                data = {item.name}/>
                            })}
                        width = {200}
                    />
                    <Column
                        header = {<Cell>Instagram</Cell>}
                        cell = {this.state.data.map((item) => {
                            <MyLinkCell 
                                data = {item.link}/>
                        })}
                        width = {200}
                    />
                </Table>
            </div>
        )
    }
}

export default HistoryTable;

