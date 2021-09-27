const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs:0})
  response.json(blogs)
})

const getTokenFrom = request => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')){
    return auth.substring(7)
  }
  return null
}

bloglistRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
 
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
 
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  // if likes is missing from the request, default it to 0
  if (blog.likes === undefined) {
    blog.likes = 0
  } 
  if (blog.url === undefined || blog.title === undefined) {
    return response.status(400).send({ error: 'title or url missing '})
  }
  
  const savedBlog = await blog.save()

  // user object also changes. the blog id is concatenated
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

bloglistRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    'title': body.title,
    'author': body.author,
    'url': body.url,
    'likes': body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(blog)

})

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = bloglistRouter