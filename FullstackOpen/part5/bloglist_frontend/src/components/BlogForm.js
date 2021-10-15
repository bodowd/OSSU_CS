import React, { useState }from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form className='blogForm' onSubmit={handleSubmit}>
        <div>
                title:
          <input className='blogFormTitle' value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
                author:
          <input className='blogFormAuthor' value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
                url:
          <input className='blogFormUrl' value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm