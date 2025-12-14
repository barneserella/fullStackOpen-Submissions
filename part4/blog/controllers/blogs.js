const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const tokenExtractor = require('../utils/middleware')
const userExtractor = require('../utils/middleware')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
        res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        if(blog) {
            res.json(blog)
        } else {
            res.status(404).end()
        }
})

blogsRouter.post('/', userExtractor.userExtractor, tokenExtractor.tokenExtractor, async (req, res) => {
    const body = req.body
    const user = req.user
    
    if(!user){
        return res.status(400).json({ error: 'token missing or not valid' })
    }
    if(!body.title || !body.url){
        return res.status(400).json({ error: 'title and url are required' })
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    res.status(201).json(savedBlog)
    
})

blogsRouter.delete('/:id', userExtractor.userExtractor, tokenExtractor.tokenExtractor, async (request, response) => {
    const user = request.user
    console.log(user)
    const blogId = request.params.id
    console.log(blogId)
    const blog = await Blog.findById(blogId)

    if(!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if(blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'not authorized to delete this blog'})
    }

    await Blog.findByIdAndDelete(blogId)

    user.blogs = user.blogs.filter(blog => blog.toString() !== blogId.toString())
    await user.save()

    return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    console.log('USER FROM REQUEST BODY:', request.body.user)
    const { title, author, url, likes, user } = request.body

    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
    blog.user = user.id

    const updatedBlog = await blog.save()

    const populatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 })

    response.json(populatedBlog)
})

module.exports = blogsRouter