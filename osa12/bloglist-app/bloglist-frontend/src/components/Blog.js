import PropTypes from 'prop-types'
import { TableRow, TableCell } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <TableRow key={blog.id}>
      <TableCell>
        <a href={`/blogs/${blog.id}`}>{blog.title}</a>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
