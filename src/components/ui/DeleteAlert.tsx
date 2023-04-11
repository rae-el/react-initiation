import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Warning from '@mui/icons-material/Warning'

function DeleteAlert(){
    return(
        <Alert
        icon={<Warning sx={{ mx: 0.5 }} />}
        variant="outlined"
        action={
            <Button>
              Undo
            </Button>
        }
      >
          Task was successfully deleted
      </Alert>
    )
}
export default DeleteAlert