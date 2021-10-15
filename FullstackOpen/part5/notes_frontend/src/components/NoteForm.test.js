/* eslint-disable no-trailing-spaces */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()

  const component = render(
    <NoteForm createNote={createNote} />
  )

  // select the <input> tag in NoteForm component
  const input = component.container.querySelector('input')
  // select the <form> tag in NoteForm component
  const form = component.container.querySelector('form')

  // simulate writing to input fields by creating a change event to them and defining an object containing the "text" written to the field
  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  // simulate the submit event to the form
  fireEvent.submit(form)

  // check that createNote is called once
  expect(createNote.mock.calls).toHaveLength(1)
  
  // check content of the createNote call
  expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier')
})