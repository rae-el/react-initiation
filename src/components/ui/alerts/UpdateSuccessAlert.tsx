import Alert from "@mui/material/Alert"
import Check from '@mui/icons-material/Check'
import { useContext } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../../context/todoContext"
import { TodoContextType } from "../../../@types/Todo"

export default function UpdateSuccessAlert(){
  const {updateSuccessAlertOpen, setUpdateSuccessAlertOpen, isMobile} = useContext(TodoContext) as TodoContextType
  let width: string = '299px'
  if(isMobile){width = '90%'}
 
    return(
        <Collapse in={updateSuccessAlertOpen}><Alert
        icon={<Check sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='success'
        sx={{marginTop:2, width:{width}}}
        onClose={() => setUpdateSuccessAlertOpen(false)}>
          Task was successfully updated
      </Alert></Collapse>
    )
}