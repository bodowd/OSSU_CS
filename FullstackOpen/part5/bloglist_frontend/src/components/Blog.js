import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
const Blog = ({blog, user}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

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
        <div style={showWhenVisible}>
            <div>
                {blog.url}
            </div>
            <div>
                likes: {blog.likes}
                <button>like</button>
            </div>
            <div>
                {user.name}
            </div>
            <button onClick={toggleVis}>cancel</button>
        </div>
        <div style={hideWhenVisible}>
        </div>
    </div>
)}

export default Blog