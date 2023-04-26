import Alert from "@mui/material/Alert"
import Warning from '@mui/icons-material/Warning'
import { useContext } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../../context/todoContext"
import { TodoContextType } from "../../../@types/Todo"

export default function DeleteFailedAlert(){
  const {deleteFailedAlertOpen, setDeleteFailedAlertOpen, deleteId, isMobile} = useContext(TodoContext) as TodoContextType
  let width: string = '35%'
  if(isMobile){width = '90%'}

    return(
        <Collapse in={deleteFailedAlertOpen}><Alert
        icon={<Warning sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='error'
        sx={{marginTop:2, width:{width}}}
        onClose={() => setDeleteFailedAlertOpen(false)}>
          Could not delete task {deleteId}
      </Alert></Collapse>
    )
}