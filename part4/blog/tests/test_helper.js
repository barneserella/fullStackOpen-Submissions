const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'This is a blog #1',
    author: 'This is the author of blog #1',
    url: 'url for blog #1',
    likes: 1,
  },
  {
    title: 'This is a blog #2',
    author: 'This is the author of blog #2',
    url: 'url for blog #2',
    likes: 2,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}