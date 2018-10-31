import React from 'react';
import PropTypes from 'prop-types';
import key from 'weak-key';


const Table = ({data}) =>
    !data.length ? (<p>Nothing to show</p>) : (
        <div className="column">
            <h2 className="subtitle">
                Showing <strong>{data.length} items</strong>
            </h2>
            <div className="Data">
                {data.map(el => (
                    <div className="cell" key={el.id}>
                        {el.flow}
                        {el.statement}
                        {el.agree}
                        {el.disagree}
                    </div>
                ))}
            </div>
        </div>
    );

Table.PropTypes = {
    data: PropTypes.array.isRequired
};

export default Table;
