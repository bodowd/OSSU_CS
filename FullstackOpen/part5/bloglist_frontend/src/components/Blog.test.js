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

const handleLike = () => {}
const handleRemove = () => {}

describe('Blog', () => {
  test('<Blog /> renders the blog title and author but does not render its url or number of likes by default', () =>{

    const component = render(
      <Blog blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} own={true} />
    )
    expect(component.container).toHaveTextContent(`${blog.title}`)
    expect(component.container).toHaveTextContent(`${blog.author}`)
    console.log(component.container.textContent)
    expect(component.container).not.toHaveTextContent(`${blog.url}`)
    expect(component.container).not.toHaveTextContent(`${blog.likes}`)
  })


})