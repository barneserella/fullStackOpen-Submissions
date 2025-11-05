import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import { useState, useEffect } from "react"
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newContent, setNewContent] = useState('')

    useEffect(() => {
      blogService
        .getAll()
        .then(initialBlogs => {
          setBlogs(initialBlogs)
        })
  }, [])

  const addBlog = (event) => {
      event.preventDefault()
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        content: newContent,
      }
  
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          console.log(blogs)
        })
        .catch(err => {
              console.error('Error adding blog:', err)
            })
    }
  
  return (
    <>
      <h1>Blogs</h1>
      <ul>
        {Array.isArray() && blogs.length > 1 ? blogs.map((blog) => (
          <li>{blog.title}</li> )) : 
          <Blog blogs={blogs} />
        }
      </ul>
      

      <BlogForm addBlog={addBlog} newTitle={newTitle} setNewTitle={setNewTitle} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newContent={newContent} setNewContent={setNewContent} />
    </>
  )
}

export default App
