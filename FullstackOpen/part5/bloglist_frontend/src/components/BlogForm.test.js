import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('BlogForm', () => {
  test('the form calls the event handler received as props with the right details when a new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    // get the portions from the form
    const input = component.container.querySelector('.blogFormAuthor')
    const form = component.container.querySelector('.blogForm')

    // fill the fform
    fireEvent.change(input, {
      target: { value: 'testing form' }
    })

    // submit the form
    fireEvent.submit(form)

    // check the results
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('testing form')


    // test also the title portion
    const titleInput = component.container.querySelector('.blogFormTitle')
    fireEvent.change(titleInput, {
      target: { value: 'testing form title' }
    })

    fireEvent.submit(form)
    expect(createBlog.mock.calls[1][0].title).toBe('testing form title')

  })
})
