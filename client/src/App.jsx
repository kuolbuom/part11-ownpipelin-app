import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Togglable from './components/Togglable'

import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'
import SingleBlog from './components/SingleBlog'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Notification from './components/Notification'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesNotitication, setSuccesNotification] = useState(null)


  const navigate = useNavigate()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  console.log(user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      setUser(user)

      setUserName('')
      setPassword('')

      setUser(user)
      navigate('/')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const addBlog = (newObject) => {
    blogService.create(newObject).then(newBlog => {
      setBlogs(blogs.concat(newBlog))

      setSuccesNotification({ type: 'success', text: `a new blog ${newBlog.title} by ${newBlog.author} added` })
      setTimeout(() => {
        setSuccesNotification(null)
      }, 5000)

      navigate('/')
    })
  }

  const handleLikes = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    console.log('Returned Blog', returnedBlog)
    setBlogs(prevBlogs =>
      prevBlogs.map(b => b.id === returnedBlog.id ? returnedBlog : b)
    )
  }

  const handleDelete = async (blog) => {
    const ok = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )

    if (!ok) {
      return
    }

    await blogService.remove(blog.id)

    setBlogs(previousBlogs =>
      previousBlogs.filter(b => b.id !== blog.id)
    )

    navigate('/')
  }

  return (
    <div>
      <Navbar
        handleLogout={handleLogout}
        user={user}
      />

      <Notification succesNotitication={succesNotitication} />

      <Routes>
        <Route
          path='/'
          element={
            <Home
              succesNotitication={succesNotitication}
              blogs={blogs}
              handleDelete={handleDelete}
              handleLikes={handleLikes}
              user={user}
            />
          }
        />

        <Route
          path='/blogs/:id'
          element={(
            <SingleBlog
              user={user}
              blogs={blogs}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
            />
          )}
        />

        <Route
          path='/login'
          element={
            !user
              ? (
                <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) => setUserName(target.value)}
                  handlePasswordChange={({ target }) => setPassword(target.value)}
                  handleSubmit={handleLogin}
                  message={errorMessage}
                />
              ) : <p>You are already loged in.</p>
          }
        />

        <Route
          path='/new_blog'
          element={
            <BlogsForm createBlog={addBlog} />
          }
        />
      </Routes>


      {/* {user && (<div><p>{user.name} loged in <button onClick={handleLogout}>logout</button></p></div>)} */}


      {/*
              {!user &&
                <Togglable buttonLabel='login'>
                  <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUserName(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                    message={errorMessage}
                  />
                </Togglable>
              }

              {user &&
                <Togglable buttonLabel='create new blog'>
                  <BlogsForm
                    createBlog={addBlog}
                  />
                </Togglable>
              } */}

    </div>
  )
}

export default App