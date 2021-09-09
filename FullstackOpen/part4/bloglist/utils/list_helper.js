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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}