import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVis = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5

  }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {/* don't show the view button if we are viewing the blog. instead show the cancel button */}
        <button onClick={toggleVis} style={hideWhenVisible}>view</button>
      </div>

      {/* visible flag to not render the componenet until it's true */}
      {visible&&(
        <div style={showWhenVisible}>
          <div>
            {blog.url}
          </div>
          <div className="likes">
                likes: {blog.likes}
            <button id="likeButton" onClick={() => handleLike(blog.id, false)}>like</button>
            <button id="dislikeButton" onClick={() => handleLike(blog.id, true)}>dislike</button>
          </div>
          <div>
            {user.name}
          </div>
          <div>
            <button onClick={toggleVis}>cancel</button>
          </div>
          <div>
            {own && <button id="removeButton" onClick={() => handleRemove(blog.id)}>remove</button>}
          </div>
        </div>
      )}
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog