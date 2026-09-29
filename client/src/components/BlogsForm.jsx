import { TextField, Button } from '@mui/material'
import { useState } from 'react'

const BlogsForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const inputSx = { '& .MuiInputBase-input': { padding: '5px' } }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new blog</h2>
      <div>
        <TextField
          id='title'
          sx={inputSx}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='insert title'
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <TextField
          id='author'
          sx={inputSx}
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='insert author'
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <TextField
          id='url'
          sx={inputSx}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='insert url'
        />
      </div>
      <br />
      <Button type='submit' variant='contained' color='primary'>
        create
      </Button>
    </form>
  )
}

export default BlogsForm
