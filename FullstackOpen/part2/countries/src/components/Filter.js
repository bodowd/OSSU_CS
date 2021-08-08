import React from 'react'

const Filter = (props) => {
    return (
        <div>
            find countries <input value={props.search} onChange={props.onSearch} />
        </div>
    )
}

export default Filter
