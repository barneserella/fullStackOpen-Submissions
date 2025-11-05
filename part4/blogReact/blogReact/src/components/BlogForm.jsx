const BlogForm = ({ addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newContent, setNewContent }) => {
    
    const handleNewTitle = (event) => {
        console.log(event.target.value)
        setNewTitle(event.target.value)
    }

    const handleNewAuthor = (event) => {
        console.log(event.target.value)
        setNewAuthor(event.target.value)
    }

    const handleNewContent = (event) => {
        console.log(event.target.value)
        setNewContent(event.target.value)
    }

  return (
    <>
    <form onSubmit={addBlog}>
        <div>
          Title: <input value={newTitle} onChange={handleNewTitle} />
        </div>
        <div>
          Author: <input value={newAuthor} onChange={handleNewAuthor} />
        </div>
        <div>Blog Post: 
            <textarea value={newContent} onChange={handleNewContent} />
        </div>
      
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
