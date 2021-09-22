const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')


bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  // if likes is missing from the request, default it to 0
  if (blog.likes === undefined) {
    blog.likes = 0
  } 
  if (blog.url === undefined || blog.title === undefined) {
    return response.status(400).send({ error: 'title or url missing '})
  }
  

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = bloglistRouter