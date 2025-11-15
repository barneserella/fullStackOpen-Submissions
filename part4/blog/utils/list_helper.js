const dummy = (blogs) => {
  return 1;
}

const totalLikes = (listOfBlogs) => {
    let likes = 0 
    listOfBlogs.forEach(blog => {
        likes += blog.likes
    })
    return likes;
}

const favoriteBlog = (listOfBlogs) => {
    let blogWithMostLikes = 0
    listOfBlogs.forEach(blog => {
        if(blog.likes > blogWithMostLikes) {
            blogWithMostLikes = blog.likes
        }
    })

    return blogWithMostLikes;
}

const mostBlogs = (arrayOfBlogs) => {
    let authors = []
    let blogs = 0
    let authorWithMostBlogs = {}
    arrayOfBlogs.forEach(blog => {
        let existingAuthor = authors.find(author => author.author === blog.author)

        if(existingAuthor) {
            existingAuthor.blogs++
        }else{
            authors.push({
                author: blog.author,
                blogs: 1
            })
        }
    })

    authors.forEach(author => {
        if(author.blogs > blogs){
            authorWithMostBlogs = {
                author: author.author,
                blogs: author.blogs
            }
            blogs = author.blogs
        }
    })

    return authorWithMostBlogs
}

const mostLikes = (arrayOfBlogs) => {
    let authors = []
    let likes = 0
    let authorWithMostLikes = {}
    arrayOfBlogs.forEach(blog => {
        let existingAuthor = authors.find(author => author.author === blog.author)

        if(existingAuthor) {
            existingAuthor.likes += blog.likes
        }else{
            authors.push({
                author: blog.author,
                likes: blog.likes
            })
        }
    })

    authors.forEach(author => {
        if(author.likes > likes){
            authorWithMostLikes = {
                author: author.author,
                likes: author.likes
            }
            likes = author.likes
        }
    })
    return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}