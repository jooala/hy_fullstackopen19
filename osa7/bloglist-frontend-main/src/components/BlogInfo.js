import { useParams } from 'react-router-dom'
import { Button, Card, CardContent, Typography } from '@mui/material'

const BlogInfo = ({ blogs, updateBlog }) => {
  const id = useParams().id
  const blog = blogs.find((u) => u.id === id)

  if (!blog) {
    return null
  }

  const increaseLikes = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(blog.id, likedBlog)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{blog.title}</Typography>
        <Typography variant="body1">
          <a href={`${blog.url}`}>{blog.url}</a>
          <p>{blog.likes} likes</p>
        </Typography>
        <Button variant="contained" onClick={increaseLikes} id="likeBlog">
          Like
        </Button>
        <br />
        <Typography variant="body1">Added by {blog.user.name}</Typography>
      </CardContent>
    </Card>
  )
}

export default BlogInfo
