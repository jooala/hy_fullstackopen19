const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Koodauksen alkeet",
    author: "Sami Samppa",
    url: "https://www.reaktor.com/blog/viisi-harhakasitysta-koodaamisesta/",
    likes: 12
  },
  {
    title: "Tekoälyn haasteet",
    author: "Tero Teräväinen",
    url: "http://google.fi",
    likes: 4
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test("blogs are returned as right amount json ", async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test("blogs have field identifier named id", async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test("blogs are created from post request", async () => {
  const newBlog = {
      title: "Suomen luonto",
      author: "Taavi Tiivatti",
      url: "http://suomenluonto.fi",
      likes: 28
  }

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
      "Suomen luonto"
  )
})

test("if likes has no value, value is set to 0", async () => {
  const newBlog = {
      title: "Machine Learning",
      author: "Richard Harry",
      url: "http://machinelearning.fi"
  }

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const likes = response.body.map(blog => blog.likes)
  const lastBlog = likes[likes.length - 1]

  expect(lastBlog).toEqual(0)
})

test("if title and url are not defined, return 400 bad request", async () => {
  const newBlog = {
    author: "Michael El Coder",
    likes: 33
  } 

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})