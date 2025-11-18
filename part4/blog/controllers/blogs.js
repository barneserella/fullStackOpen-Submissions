const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
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

blogsRouter.post('/', async (req, res) => {
    const body = req.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })

    if(!body.title || !body.url){
        return res.status(400).json({ error: 'title and url are required' })
    }
    else{
        const savedBlog = await blog.save()
        return res.status(201).json(savedBlog)
    }
})

module.exports = blogsRouter