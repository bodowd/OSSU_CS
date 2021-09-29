const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs:0})
  response.json(blogs)
})

bloglistRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  // user is attached to request now because of middleware
  const user = request.user
 
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

bloglistRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id){
    return response.json(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  
  if (blog.user.toString() === user.id.toString()){
    await blog.remove()
    // also remove it from the list of blogs in user
    user.blogs = user.blogs.filter(b => b.id.toString !== request.params.id.toString())
    await user.save()
    response.status(204).end()
  } else {
    return response.json(401).json({ error: 'only the creator can delete the blog '})
  }
})

module.exports = bloglistRouter