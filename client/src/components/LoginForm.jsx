import { TextField, Button } from '@mui/material'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Log in application</h2>

      {props.message && (
        <p
          style={{
            border: '3px solid red',
            backgroundColor: 'lightgray',
            borderRadius: '5px',
            color: 'red',
            paddingLeft: '5px',
            paddingTop: '10px',
            paddingBottom: '10px',
            fontSize: '25px',
          }}
        >
          {props.message}
        </p>
      )}

      <form onSubmit={props.handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <TextField
            id="username"
            label="username"
            name="username"
            variant="standard"
            autoComplete="off"
            sx={{ '& .MuinputBase-input': { padding: '10px' } }}
            type="text"
            value={props.username}
            onChange={props.handleUsernameChange}
            placeholder="username"
          />
        </div>
        <br />

        <div style={{ marginBottom: '10px' }}>
          <TextField
            id="password"
            label="password"
            name="password"
            variant="standard"
            autoComplete="new-password"
            sx={{ '& .MuinputBase-input': { padding: '10px' } }}
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
            placeholder="password"
          />
        </div>

        <br />
        <Button type="submit" variant="contained" color="primary">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
