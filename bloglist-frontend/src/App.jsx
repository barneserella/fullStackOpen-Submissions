import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [singleBlog, setSingleBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: singleBlog.title,
          author: singleBlog.author,
          url: singleBlog.url,
        }
    
        blogService
          .create(blogObject)
          .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setMessage(`a new blog ${singleBlog.title} by ${user.name} added`)
            setTimeout(() => {
              setMessage(null)},
              5000
            )
            console.log(blogs)
            console.log(returnedBlog)
          })
          .catch(err => {
                console.error('Error adding blog:', err)
                setErrorMessage(`error adding blog`)
                setTimeout(() => {
                  setErrorMessage(null)},
                  5000
                )
              })
      }

  const handleLogin = async event => {
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
    }catch (error) {
      console.error(error)
      setErrorMessage(`wrong username or password`)
                setTimeout(() => {
                  setErrorMessage(null)},
                  5000
                )
    }
  }

  const handleLogout = (e) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch(error) {
      console.error(error)
    }
  }

  const handleBlogFormChange = (event) => {
    const { name, value } = event.target
    setSingleBlog(prevData => ({
      ...prevData,
      [name]: value
    }))

  }

  const loginForm = () => (
    
      <form onSubmit={handleLogin}>
        <div>
          <label>username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>
        <div>
          <label>password
            <input type="text" value={password} onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogForm = () => 
     (
      <form onSubmit={addBlog}>
          <div>
            <label>title:
              <input type="text" value={singleBlog.title} name='title' onChange={handleBlogFormChange} />
            </label>
          </div>
          <div>
            <label>author:
              <input type="text" value={singleBlog.author} name='author' onChange={handleBlogFormChange} />
            </label>
          </div>
          <div>
            <label>url:
              <input type="text" value={singleBlog.url} name='url' onChange={handleBlogFormChange} />
            </label>
          </div>
        <button type="submit">create</button>
        </form>
    )
  



  return (
    <div>
      <h2>blogs</h2>

      {message && ( 
      <Notification  style={{
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }} message={message} /> )}

  {errorMessage && (
      <Notification  style={{
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }} message={errorMessage} />)}

      {!user && loginForm()}
      {user && (
      <div>
        <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        {blogForm()}

        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      )}

    </div>
  )
}

export default App