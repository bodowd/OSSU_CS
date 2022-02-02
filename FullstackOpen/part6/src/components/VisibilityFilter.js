import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      {/* since the name attribute of the radio buttons is the same, they form a button group where only one option can be selected */}
      all{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => filterChange('ALL')}
      />
      important{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => filterChange('IMPORTANT')}
      />
      nonimportant{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => filterChange('NONIMPORTANT')}
      />
    </div>
  )
}

export default VisibilityFilter