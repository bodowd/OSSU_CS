import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


const user = { name: 'matt' }
const blog = {
  title: 'test title',
  author: 'test author',
  url: 'url',
  likes: 10,
  user: user
}

let handleLike = () => {}
let handleRemove = () => {}

describe('Blog', () => {
  test('<Blog /> renders the blog title and author but does not render its url or number of likes by default', () =>{

    const component = render(
      <Blog blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} own={true} />
    )
    expect(component.container).toHaveTextContent(`${blog.title}`)
    expect(component.container).toHaveTextContent(`${blog.author}`)
    // console.log(component.container.textContent)
    expect(component.container).not.toHaveTextContent(`${blog.url}`)
    expect(component.container).not.toHaveTextContent(`${blog.likes}`)
  })

  test('<Blog /> renders url and likes when the button controlling the shown details has been clicked', () => {
    const component = render(
      <Blog blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} own={true} />
    )

    // don't use query selector because there's several buttons on the component. Look for the text of the button
    const button = component.getByText('view')
    fireEvent.click(button)

    // console.log(component.container.textContent)
    expect(component.container).toHaveTextContent(`${blog.url}`)
    expect(component.container).toHaveTextContent(`${blog.likes}`)
  })

  test('when like button is clicked twice, the event handler componenet received as props is called twice', () => {
    // assign the mockHandler to the handLike variable which goes to the component below
    const mockHandler = jest.fn()
    handleLike = mockHandler

    const component = render(
      <Blog blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} own={true} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    // console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})