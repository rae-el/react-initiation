import Alert from "@mui/material/Alert"
import Check from '@mui/icons-material/Check'
import { useContext } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../../context/todoContext"
import { TodoContextType } from "../../../@types/Todo"

export default function UpdateFailedAlert(){
  const {updateFailedAlertOpen, setUpdateFailedAlertOpen} = useContext(TodoContext) as TodoContextType
  
    return(
        <Collapse in={updateFailedAlertOpen}><Alert
        icon={<Check sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='error'
        sx={{marginTop:2, width:'55%'}}
        onClose={() => setUpdateFailedAlertOpen(false)}>
          Could not update task
      </Alert></Collapse>
    )
}