import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('Enter blog title here')
  const author = screen.getByPlaceholderText('Enter blog author here')
  const url = screen.getByPlaceholderText('Enter blog url here')
  const sendButton = screen.getByText('add')

  await user.type(title, 'testing title form...')
  await user.type(author, 'testing author form...')
  await user.type(url, 'testing url form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith({
  title: 'testing title form...',
  author: 'testing author form...',
  url: 'testing url form...'
})

  console.log(createBlog.mock.calls)
  console.log(createBlog.mock.calls[0][0])
  console.log(createBlog.mock.calls[0][1])
  console.log(createBlog.mock.calls[0][2])
})