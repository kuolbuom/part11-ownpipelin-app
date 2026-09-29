import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'

const Navbar = ({ user, handleLogout }) => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
  }

  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Blog App
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link style={linkStyle} to='/'>
            <Button color='inherit'>
              Blogs
            </Button>
          </Link>

          {!user ? '' : <Link style={linkStyle} to='/new_blog'>
            <Button color='inherit'>
               New Blog
            </Button>
          </Link>}

          {user ? <Button color='inherit' onClick={handleLogout}>
            logout
          </Button> : <Link style={linkStyle} to='/login'>
            <Button color='inherit'>
              login
            </Button>
          </Link>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
