import React from 'react'

const BlogForm = ({
    handleSubmit,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
    }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                title:
                <input value={title} onChange={handleTitleChange} />
                </div>
                <div>
                author:
                <input value={author} onChange={handleAuthorChange} />
                </div>
                <div>
                url:
                <input value={url} onChange={handleUrlChange} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm