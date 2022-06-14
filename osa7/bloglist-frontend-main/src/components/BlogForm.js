import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Card, CardContent, Typography } from '@mui/material'

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
      <Typography variant="h5">Create new</Typography>
      <form onSubmit={addBlog}>
        <Card sx={{ maxWidth: 375 }}>
          <CardContent>
            <TextField
              label="Title"
              size="small"
              value={newTitle}
              id="title-input"
              onChange={({ target }) => setNewTitle(target.value)}
            />
            <div>
              <TextField
                size="small"
                label="Author"
                value={newAuthor}
                id="author-input"
                onChange={({ target }) => setNewAuthor(target.value)}
              />
            </div>
            <div>
              <TextField
                label="URL"
                size="small"
                value={newUrl}
                id="url-input"
                onChange={({ target }) => setNewUrl(target.value)}
              />
            </div>
            <br />
            <Button variant="contained" type="submit" id="createBlog">
              create
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
