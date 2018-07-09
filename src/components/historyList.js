import React from 'react';

const HistoryList = (props) => (
    <table className="table historyTable">
        <thead>
            <tr>
                <th className="tableHeader">
                    Name
                </th>
                <th className="tableHeader">
                    Instagram
                </th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(props.data) &&
                props.data.map((item) =>
                    <tr key={item.term}>
                        <td className="tableData">
                            {item.term}
                        </td>
                        <td className="tableData">
                            <a href={item.link} target='_blank'>{item.link}</a>
                        </td>
                    </tr>
            )}
        </tbody>
    </table>
)

export default HistoryList;