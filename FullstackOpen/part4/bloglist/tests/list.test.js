const listHelper = require('../utils/list_helper')

// some data for the tests
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0 
    }
]

const listWithManyBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]


// ------- test 1
test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

// ------- total likes tests
describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog) 
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(36)
    })
})

// ------- favorite blog tests
describe('favorite blog', () => {
    test('of empty list is zero', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
    })
    
    test('when list has only one blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        const trueAnswer = {
            title: listWithOneBlog[0].title,
            author: listWithOneBlog[0].author,
            likes: listWithOneBlog[0].likes
        }
        expect(result).toEqual(trueAnswer)
    })

    test('when list has many blogs', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        const trueAnswer = {
            title: listWithManyBlogs[2].title,
            author: listWithManyBlogs[2].author,
            likes: listWithManyBlogs[2].likes
        }
        expect(result).toEqual(trueAnswer)
    })
})

// ------ author with most blogs tests
describe('author with the most blogs', () => {
    test('when list has many blogs', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        const trueAnswer = {
            author: "Robert C. Martin",
            blogs: 3
        }
        expect(result).toEqual(trueAnswer)
    })
})

// ------- author with most likes
describe('author with the most likes', () => {
    test('when list has many blogs', () => {
        const result = listHelper.mostLikes(listWithManyBlogs)
        const trueAnswer = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        expect(result).toEqual(trueAnswer)
    })
})