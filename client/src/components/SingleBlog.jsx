import { Link, useParams } from 'react-router-dom'
import { Button } from '@mui/material'

const SingleBlog = ({ blogs, user, handleLikes, handleDelete }) => {
  const { id } = useParams()
  const blog = blogs.find(currentBlog => currentBlog.id === id)

  const actionRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: 8
  }

  const pageStyle = {
    padding: '14px',
    lineHeight: 1.6
  }

  const authorStyle = {
    color: 'rgb(100, 100, 100)',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: 8
  }

  const creatorStyle = {
    color: 'rgb(100, 100, 100)',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: 8,
    marginTop: 8
  }

  console.log('SingleBlog blog:', blog)
  console.log('SingleBlog blog.user:', blog?.user)
  console.log('typeof blog.user:', typeof blog?.user)

  if (!blog) {
    return (
      <div>
        <h2>blog not found</h2>
        <Link to="/">back to blogs</Link>
      </div>
    )
  }

  // Extract user ID from blog.user. can be string ID or object with .id property
  const blogUserId = typeof blog.user === 'object'
    ? blog.user.id
    : blog.user

  // Only show delete button if logged-in user is blog creator
  const showDeleteButton = blogUserId === user?.id

  const creatorName = typeof blog.user === 'object'
    ? blog.user.name || blog.user.username || 'unknown'
    : 'unknown'

  return (
    <div style={pageStyle}>
      <h2 style={{ fontFamily: 'Arial, sans-serif'}}> {blog.title}</h2>
      <div style={authorStyle}>{blog.author}</div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div style={creatorStyle}>
        <span>
          added by {creatorName}
        </span>
      </div>
   
      <div style={actionRowStyle}>
          <span style={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>{Number(blog.likes) || 0} likes 
          </span>
        {/* Like button only shown to authenticated users */}
        {user && (
          <Button
            variant="outlined"
            onClick={() => handleLikes(blog)}
            sx={{ borderColor: 'rgb(555, 0, 0', color: 'lightBlue' }}
          >
            like
          </Button>
        )}
        {/*  Delete button only shown to blog creator */}
        {showDeleteButton && (
          <Button
            variant='outlined'
            sx={{ borderColor: 'red', color: 'red' }}
            onClick={() => handleDelete(blog)}>
            remove
          </Button>
        )}
      </div>
      {/*  Show message to unauthenticated users that they need to log in to like */}
      {!user && <div>log in to like this blog</div>}
      {/* <Link to="/">back to blogs</Link> */}
    </div>
  )
}

export default SingleBlog
