import Alert from "@mui/material/Alert"
import Check from '@mui/icons-material/Check'
import { useContext } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../../context/todoContext"
import { TodoContextType } from "../../../@types/Todo"

export default function UpdateFailedAlert(){
  const {updateFailedAlertOpen, setUpdateFailedAlertOpen, isMobile} = useContext(TodoContext) as TodoContextType
  let width: string = '35%'
  if(isMobile){width = '90%'}
  
    return(
        <Collapse in={updateFailedAlertOpen}><Alert
        icon={<Check sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='error'
        sx={{marginTop:2, width:{width}}}
        onClose={() => setUpdateFailedAlertOpen(false)}>
          Could not update task
      </Alert></Collapse>
    )
}