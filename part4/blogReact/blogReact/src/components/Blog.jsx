import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog'>

      <div style={blogStyle}>
        <div style={hideWhenVisible}>{blog.title} {blog.author}<button onClick={toggleVisibility}>view</button></div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button><br/>
          {blog.url}<br/>
          {blog.likes}<button onClick={() => updateBlog(blog.id)} >like</button><br/>
          {console.log('Blog.jsx, blog.id: ', blog.id)}
          {blog.user?.name}<br/>
          {console.log('Blog.jsx, blog.user: ', blog.user)}
          {blog.user?.username === user?.username &&
            <button onClick={() => deleteBlog(blog.id)}>remove</button>}
        </div>
      </div>


    </div>
  )
}

export default Blog