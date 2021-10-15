import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// eslint-disable-next-line no-unused-vars
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    import: true
  }

  const component = render(
    <Note note={note} />
  )

  //   for debugging
  //   const li = component.container.querySelector('li')
  //   console.log(prettyDOM(li))
  // render returns an object with several properties. One of the properties is called container and it contains all of the HTML rendered by the component
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  //   another method to search for content in a component
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )

  expect(element).toBeDefined()

  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

})

test('clicking the button calls event handler once', () => {
  const note ={
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // mock function defined with Jest
  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  // finds the button based on the text from the rendered component and clicks the element
  const button = component.getByText('make not important')
  // make the click
  fireEvent.click(button)
  // verifies that the mock function has been called exactly once
  expect(mockHandler.mock.calls).toHaveLength(1)
})


