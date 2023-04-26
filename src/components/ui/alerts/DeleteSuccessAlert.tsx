import Alert from "@mui/material/Alert"
import Warning from '@mui/icons-material/Warning'
import { useContext, useEffect, useState } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../../context/todoContext"
import { TodoContextType } from "../../../@types/Todo"

export default function DeleteSuccessAlert(){
  const {deleteSuccessAlertOpen, setDeleteSuccessAlertOpen, deleteId} = useContext(TodoContext) as TodoContextType
  setTimeout(()=>{
    setDeleteSuccessAlertOpen(false)
  }, 30000)

    return(
        <Collapse in={deleteSuccessAlertOpen} hidden={deleteSuccessAlertOpen}><Alert
        icon={<Warning sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='warning'
        sx={{marginTop:2, width:'85%'}}
        onClose={() => setDeleteSuccessAlertOpen(false)}>
          Task {deleteId} was successfully deleted
      </Alert></Collapse>
    )
}