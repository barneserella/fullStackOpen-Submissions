const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let loggedInToken;
beforeEach(async () => {
  await Blog.deleteMany({})

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  const response = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })

    loggedInToken = response.body.token

    const blogsWithUser = helper.initialBlogs.map(b => ({ 
      ...b,
      user: user._id
    }))

    await Blog.insertMany(blogsWithUser)
})

test('blogs are returned as json', async () => {
  console.log('entered test')

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
   
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog object has id property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    assert.ok(blog.id, 'Expected blogs to have an id property');
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
        title: 'new blog title',
        author: 'new blog author',
        url: 'new blog url',
        likes: 67,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${loggedInToken}` })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)

  assert(titles.includes('new blog title'))
})

test('blog without likes is defaulted to 0', async () => {
  const newBlog = {
    title: 'newest blog title',
    author: 'newest blog author',
    url: 'newest blog url'
  }

  const response = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${loggedInToken}` })
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'new author who dis',
    likes: 67
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${loggedInToken}` })
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${loggedInToken}` })
      .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(n => n.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('a valid blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
        title: 'new blog title',
        author: 'new blog author',
        url: 'new blog url',
        likes: 112,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  const updated = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.strictEqual(updated.likes, 112)
})

after(async () => {
  await mongoose.connection.close()
})