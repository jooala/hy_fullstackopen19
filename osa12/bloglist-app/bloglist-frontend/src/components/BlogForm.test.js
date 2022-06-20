import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('render title & author, but not url or likes by default', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Testing Title')
  await user.type(authorInput, 'Testing Author')
  await user.type(urlInput, 'http://url.test')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Testing Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://url.test')
})
