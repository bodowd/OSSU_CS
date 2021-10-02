const lodash = require('lodash')

const dummy = (blogs) => {
    return 1

}

const totalLikes = (blogs) => {
    const reducer = (prevVal, curVal) => {
        // access the likes parameter of the current object
        return prevVal + curVal.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    // reduce(previousValue, currentValue)
    // previousValue will be x or y depending on the ternary 
    // currentValue starts at blogs[0], but will be replaced by previous value
    const result = blogs.reduce((x, y) => x.likes > y.likes ? x : y, blogs[0])
    return {
        title: result.title,
        author: result.author,
        likes: result.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    // group by authors, and then count up how many blogs are under each author
    
    const groupByAuthor = lodash.groupBy(blogs, blog => blog.author) 
    // ['author': [BlogObjectwithMatchingAuthor], 'author2': ['BlogObjectwithAuthor2]}
    const authorBloglistPairs = lodash.toPairs(groupByAuthor)
    // [['author', [BlogObjectswithMatchingAuthor]], ['author2', [BlogObjectswithMatchingAuthor2]]
    const authorBlogCounts = authorBloglistPairs.map(
        ([author, blogs]) => ([author, blogs.length])
        )
    const result = authorBlogCounts.reduce(
        // function looks for which blogs.length is larger and returns x or y as the previous value
        (x,y) => x[1] > y[1] ? x : y, authorBlogCounts[0]
    )
    return {
        author: result[0],
        blogs: result[1]
    }
}

const mostLikes = (blogs) => {
    const reducer = (prev, cur) => {
        return prev+cur
    }
    if (blogs.length === 0) {
        return null
    }

    const groupByAuthor = lodash.groupBy(blogs, blog => blog.author)
    const authorBloglistPairs = lodash.toPairs(groupByAuthor) 
    const authorLikesCounts = authorBloglistPairs.map(
        ([author, blogs]) => ([author, totalLikes(blogs)])
        )
    const result = authorLikesCounts.reduce(
        (x,y) => x[1] > y[1] ? x : y, authorLikesCounts[0]
    )
    return {
        author: result[0],
        likes: result[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}