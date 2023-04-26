import Alert from "@mui/material/Alert"
import Check from '@mui/icons-material/Check'
import { useContext } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../../context/todoContext"
import { TodoContextType } from "../../../@types/Todo"

export default function CreateFailedAlert(){
  const {createFailedAlertOpen, setCreateFailedAlertOpen, isMobile} = useContext(TodoContext) as TodoContextType
  let width: string = '35%'
  if(isMobile){width = '90%'}

    return(
        <Collapse in={createFailedAlertOpen}><Alert
        icon={<Check sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='error'
        sx={{marginTop:2, width:{width}}}
        onClose={() => setCreateFailedAlertOpen(false)}>
          Unable to create task
      </Alert></Collapse>
    )
}