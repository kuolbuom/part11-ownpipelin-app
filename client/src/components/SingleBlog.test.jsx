import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import SingleBlog from './SingleBlog'

const blog = {
  id: '12345',
  title: 'React Router',
  author: 'Michael Chan',
  url: 'https://reactrouter.com',
  likes: 7,
  user: {
    id: 'creator123',
    username: 'creator',
    name: 'Michael Chan',
  },
}

const renderSingleBlog = (user, blogToRender = blog) => {
  render(
    <MemoryRouter initialEntries={[`/blogs/${blogToRender.id}`]}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <SingleBlog
              blogs={[blogToRender]}
              user={user}
              handleLike={vi.fn()}
              handleDelete={vi.fn()}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('<SingleBlog />', () => {
  test('shows blog information and likes to unauthenticated users but no buttons', () => {
    renderSingleBlog(null)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument(blog.title)
    expect(heading).toBeInTheDocument(blog.author)
    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText('likes 7')).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: 'like' })).toBeNull()

    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })

  test('renders when the blog has no creator', () => {
    renderSingleBlog(null, { ...blog, user: null })

    expect(screen.getByText('added by unknown')).toBeInTheDocument()
    expect(screen.getByText('likes 7')).toBeInTheDocument()
  })

  test('shows only the like button to authenticated users who are not the creator', () => {
    const loggedUser = {
      id: 'someoneElse',
      username: 'other',
    }

    renderSingleBlog(loggedUser)

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })

  test('shows like and remove buttons to the blog creator', () => {
    const creator = {
      id: 'creator123',
      username: 'creator',
    }

    renderSingleBlog(creator)

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
  })
})
