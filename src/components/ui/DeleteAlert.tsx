import Alert from "@mui/material/Alert"
import Warning from '@mui/icons-material/Warning'
import { useContext, useEffect, useState } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../context/todoContext"
import { TodoContextType } from "../../@types/Todo"

export default function DeleteAlert(){
  const {deleteAlertOpen, setDeleteAlertOpen, deleteId} = useContext(TodoContext) as TodoContextType

    return(
        <Collapse in={deleteAlertOpen} hidden={deleteAlertOpen}><Alert
        icon={<Warning sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='warning'
        sx={{marginTop:2, width:'85%'}}
        onClose={() => setDeleteAlertOpen(false)}>
          Task {deleteId} was successfully deleted
      </Alert></Collapse>
    )
}