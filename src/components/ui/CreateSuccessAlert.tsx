import Alert from "@mui/material/Alert"
import Check from '@mui/icons-material/Check'
import { useContext, useEffect, useState } from "react"
import { Collapse } from "@mui/material"
import { TodoContext } from "../../context/todoContext"
import { TodoContextType } from "../../@types/Todo"

export default function CreateAlert(){
  const {createSuccessAlertOpen, setCreateSuccessAlertOpen} = useContext(TodoContext) as TodoContextType
  setTimeout(()=>{
    setCreateSuccessAlertOpen(false)
  }, 70000)
    return(
        <Collapse in={createSuccessAlertOpen}><Alert
        icon={<Check sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='success'
        sx={{marginTop:2, width:'85%'}}
        onClose={() => setCreateSuccessAlertOpen(false)}>
          Task was successfully created
      </Alert></Collapse>
    )
}