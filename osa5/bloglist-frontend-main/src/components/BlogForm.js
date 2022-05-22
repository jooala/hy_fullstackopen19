import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <p>title:</p>
          <input
            value={newTitle}
            id='title-input'
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <p>author:</p>
          <input
            value={newAuthor}
            id='author-input'
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <p>url:</p>
          <input
            value={newUrl}
            id='url-input'
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit" id='createBlog'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm