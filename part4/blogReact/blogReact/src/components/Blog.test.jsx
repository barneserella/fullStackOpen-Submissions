import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author',
    likes: 9,
    url: 'www.url.com'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Author')

})

test('clicking the button shows url and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author',
    likes: 9,
    url: 'www.url.com'
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  expect(screen.getByText(/www\.url\.com/)).toBeInTheDocument()
  expect(screen.getByText(/9/)).toBeInTheDocument()
})

test('clicking the like button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author',
    likes: 9,
    url: 'www.url.com'
  }
  const signedInUser = {
    name: 'Tawnya B.',
    username: 'tawnya',
    id: '6fghskawted5'
  }
  
  const mockHandlerToggle = vi.fn()
  const mockHandlerUpdate = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandlerUpdate} signedInUser={signedInUser}  toggleVisibility={mockHandlerToggle} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandlerUpdate.mock.calls).toHaveLength(2)

  console.log(mockHandlerUpdate.mock.calls)
})