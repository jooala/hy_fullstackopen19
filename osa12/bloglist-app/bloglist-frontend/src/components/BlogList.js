import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import {
  TableContainer,
  Table,
  Paper,
  Typography,
  TableBody,
} from '@mui/material'

const BlogList = ({ blogs, blogService, setBlogs, setErrorMessage }) => {
  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })
    setErrorMessage(
      'a new blog ' + blogObject.title + ' by ' + blogObject.author + ' added'
    )
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  if (blogs === undefined) {
    return
    ;<></>
  }
  return (
    <div>
      <br />
      <Typography variant="h4">Blogs</Typography>
      <br />
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
