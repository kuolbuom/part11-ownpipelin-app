import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {

  const [showDetails, setShowDetails] = useState(false)




  console.log(handleLikes)


  const blogUserId = blog.user?.id || blog.user

  const creatorName = blog.user && typeof blog.user === 'object' ? blog.user.name || blog.user.username || 'unknown' : 'unknown'

  const showDeleteButton = blogUserId === user?.id

  console.log(blog.user)
console.log(typeof blog.user)

  return (
    <li>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>

      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>added by {creatorName}</div>

          <div>
            likes {blog.likes}

            {/* Like button only shown to authenticated users  */}
            {user && (
              <button
                onClick={() =>
                  handleLikes(blog)}
              >like</button>
            )}
          </div>

           {/* Delete button only shown to blog creator (showDeleteButton checks user.id === blog.user.id) */}
           {showDeleteButton && (
             <button onClick={() => handleDelete(blog)}>remove</button>
           )}

          {/* {user && blog.user.username === user.username && (
            <button style={removeStyle} onClick={() => handleDelete(blog)}>remove</button>
          )} */}

        </div>
      )}
    </li>
  )
}

export default Blog