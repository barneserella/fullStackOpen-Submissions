const Blog = ({ blogs }) => {
  return (
    <div className='blog'>
        {blogs[0].title}
        {blogs[0].author}
        {blogs[0].content}      
    </div>
  )
}

export default Blog