import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render title & author, but not url or likes by default', () => {
  const blog = {
    title: 'Tutorial to JavaScript',
    author: 'Maija Mehiläinen',
    likes: 12,
    url: 'http://www.youtube.com',
  }
  const { container } = render(<Blog blog={blog} />)

  expect(container).toHaveTextContent('Tutorial to JavaScript')
  expect(container).toHaveTextContent('Maija Mehiläinen')
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(blog.likes)
})

test('render url and likes after clicked the show button', async () => {
  const blog = {
    title: 'Tutorial to JavaScript',
    author: 'Maija Mehiläinen',
    likes: 12,
    url: 'http://www.youtube.com',
  }
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  const div = container.querySelector('.togglableContent')
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})

test('pressing like button twice registers right', async () => {
  const blog = {
    title: 'Tutorial to JavaScript',
    author: 'Maija Mehiläinen',
    likes: 12,
    url: 'http://www.youtube.com',
  }

  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const showButton = screen.getByText('Show')
  await user.click(showButton)

  const div = container.querySelector('.togglableContent')
  const likeUser = userEvent.setup()
  const likeButton = screen.getByText('Like')
  await likeUser.click(likeButton)
  await likeUser.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
