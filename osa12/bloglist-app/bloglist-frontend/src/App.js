import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/loginService'
import userService from './services/users'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

import {
  Container,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    userService.getAll().then((users) => setUsers(users))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlog = async (blogId, blogObject) => {
    blogService.update(blogId, blogObject)

    const updatedBlog = { ...blogObject, blogId }
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Logging out...')
    setUser(null)
    blogService.setToken(null)
    window.localStorage.clear()
  }

  if (user === null) {
    return (
      <Container>
        <Typography variant="h3">Login</Typography>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="Username"
              variant="standard"
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="standard"
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <br />
          <Button variant="contained" type="submit" id="loginButton">
            login
          </Button>
        </form>
      </Container>
    )
  }

  return (
    <Container>
      <Notification message={errorMessage} />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <div style={{ display: 'flex', columnGap: 10 }}>
              <Button color="inherit" component={Link} to="/">
                Blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={
              <BlogList
                blogs={blogs}
                blogService={blogService}
                setBlogs={setBlogs}
                updateBlog={updateBlog}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route path="/users" element={<UserList users={users} />} />
          <Route
            path="/users/:id"
            element={<UserInfo users={users} blogs={blogs} />}
          />
          <Route
            path="/blogs/:id"
            element={<BlogInfo blogs={blogs} updateBlog={updateBlog} />}
          />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
