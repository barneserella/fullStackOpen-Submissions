import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
    
      {user && (
      <div>
        <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
      </div>
      )}

      <h2>create new</h2>
      <form onSubmit={addBlog}>
          <div>
            <label>title:
              <input type="text" value={title} />
            </label>
          </div>
          <div>
            <label>author:
              <input type="text" value={author} />
            </label>
          </div>
          <div>
            <label>url:
              <input type="text" value={url} />
            </label>
          </div>
        <button type="submit">create</button>
        </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App