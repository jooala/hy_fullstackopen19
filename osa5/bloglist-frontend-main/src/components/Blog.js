import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {

  const [showInfoBox, setShowInfoBox] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 15
  }

  const increaseLikes = () => {
    const likedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    updateBlog(blog.id, likedBlog)
  }

  const toggleMoreInfo = () => {
    if (showInfoBox) {
      setShowInfoBox(false)
    } else {
      setShowInfoBox(true)
    }
  }

  const MoreInfoBox = () => {
    return (
      <div className="togglableContent">
        <div>
          <p> URL: {blog.url}</p>
          <p style={{ display: 'inline-block' }}>Likes: {blog.likes} </p>
          <button onClick={increaseLikes} style={{ display: 'inline-block', marginLeft: 10 }} id='likeBlog'>Like</button>
        </div>
        <button onClick={() => removeBlog(blog)} style={{ marginBottom: 10 }} id='removeBlog'>Remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <button onClick={() => toggleMoreInfo()} style={{ marginBottom: 10 }} id='showBlog'>Show</button>
      {showInfoBox
        ? <MoreInfoBox />
        : null
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog