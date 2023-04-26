import Alert from "@mui/material/Alert"
import Check from '@mui/icons-material/Check'
import { useContext } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../../context/todoContext"
import { TodoContextType } from "../../../@types/Todo"

export default function CreateSuccessAlert(){
  const {createSuccessAlertOpen, setCreateSuccessAlertOpen, isMobile} = useContext(TodoContext) as TodoContextType
  let width: string = '35%'
  if(isMobile){width = '90%'}
  
    return(
        <Collapse in={createSuccessAlertOpen}><Alert
        icon={<Check sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='success'
        sx={{marginTop:2, width:{width}}}
        onClose={() => setCreateSuccessAlertOpen(false)}>
          Task was successfully created
      </Alert></Collapse>
    )
}