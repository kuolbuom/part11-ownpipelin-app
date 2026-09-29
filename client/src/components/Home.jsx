import Blog from './Blog'

const Home = ({ blogs, handleDelete, handleLikes, user }) => {
  return (
    <div>
      <h2>blogs</h2>

      <ul>
        {[...blogs]
          .sort((a, b) => (Number(b.likes) || 0) - (Number(a.likes) || 0))
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
              user={user}
            />
          )}
      </ul>
    </div>
  )
}

export default Home
