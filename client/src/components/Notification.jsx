import { Alert } from '@mui/material'

const Notification = ({ succesNotitication }) => {
  if(succesNotitication===null) return null

  return (
    <div>
      <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={succesNotitication.type}>
        {succesNotitication.text}
      </Alert>
    </div>
  )
}

export default Notification
