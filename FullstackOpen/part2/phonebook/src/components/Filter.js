import React from 'react'

const Filter = (props) => {
  return (
      <div>
        filter shown with <input value={props.search} onChange={props.onSearch} />
      </div>
  )
}

export default Filter
