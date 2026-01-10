const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const tokenExtractor = require('../utils/middleware')
const userExtractor = require('../utils/middleware')
const jwt = require('jsonwebtoken')


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
    // const user = request.user
    // console.log("controllers, delete, user: ", user)
    const blogId = request.params.id
    // console.log("controllers, delete, blogId: ", blogId)
    // const blog = await Blog.findById(blogId)
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    //  console.log("controllers, delete, user: ", user)
    const blog = await Blog.findById(request.params.id);
    
    if(!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }
    // console.log('blog: ', blog)
    // console.log('blog.user: ', blog.user)
    // console.log('user.id: ', user.id)

    if(blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'not authorized to delete this blog'})
    }

    await Blog.findByIdAndDelete(blogId)

    user.blogs = user.blogs.filter(blog => blog.toString() !== blogId.toString())
    await user.save()

    return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, user } = request.body
    // console.log('controllers, blog.jsx, blog: ', blog)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
        title,
        author,
        url,
        $inc: { likes: 1 },  
        user: user.id
      }, {
    new: true
  }).populate('user', { username: 1, name: 1 });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter