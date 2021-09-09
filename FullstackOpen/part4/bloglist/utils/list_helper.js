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

module.exports = {
    dummy,
    totalLikes
}