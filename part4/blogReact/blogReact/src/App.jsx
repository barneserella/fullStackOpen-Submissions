import Blog from "./components/Blog";
// import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: singleBlog.title,
      author: singleBlog.author,
      url: singleBlog.url,
      content: singleBlog.content,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setMessage(`a new blog ${returnedBlog.title} ${returnedBlog.author} added`)
        setTimeout(()=> {
          setMessage('')
        }, 5000)
        console.log(blogs);
      })
      .catch((err) => {
        setErrorMessage('Error adding blog')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        console.error("Error adding blog:", err);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleBlogFormChange = (event) => {
    const { name, value } = event.target
    setSingleBlog(prevData => ({
      ...prevData,
      [name]: value
    }))

  } 
// Extracting login form to own component

  const blogForm = () => (
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
  );

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
        {blogForm()}
      </div>
    )}

      <ul>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
        
      </ul>

      {/* <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newContent={newContent}
        setNewContent={setNewContent}
      /> */}
    </>
  );
}

export default App;
