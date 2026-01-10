import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('App.jsx-useEffect, user: ', user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
        console.log(blogs)
      })
      .catch((err) => {
        setErrorMessage('Error adding blog')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        console.error('Error adding blog:', err)
      })
  }

  const updateBlog = (id) => {
    console.log('App.jsx-updateBlog, id: ', id)
    const blog = blogs.find(blog => blog.id === id)
    console.log('App.jsx-updateBlog, blog: ', blog)
    const { likes, ...rest } = blog
    const updatedLikes = likes + 1
    const changedBlog = { ...blog, likes: updatedLikes  }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
      })
      .catch(error => {
        console.error(error)
      })
  }

  const deleteBlog = (id) => {
    const blogObject = blogs.find(blog => blog.id === id)
    console.log(blogObject)

    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)){

      blogService
        .remove(id)
        .then(deletedBlog => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage('Blog deleted successfully')
          setTimeout(() => {
            setMessage('')
          }, 5000)
        }).catch(error => {
          console.error(error)
          setErrorMessage('Error deleting blog')
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef()

  const loginForm = () => {

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </>
    )}

  return (
    <>
      <h1>Blogs</h1>

      {message && (
        <Notification  style={{
          color: 'green',
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10
        }} message={message} />
      )}

      {errorMessage && (
        <Notification  style={{
          color: 'red',
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10
        }} message={errorMessage} />
      )}

      <h2>Login</h2>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        </div>
      )}

      <Togglable buttonLabel="create new blog" ref={blogFormRef} >
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
          )}

      </ul>
    </>
  )
}

export default App
