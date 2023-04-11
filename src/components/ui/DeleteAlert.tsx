import Alert from "@mui/material/Alert"
import Warning from '@mui/icons-material/Warning'
import { useEffect, useState } from "react"
import { Collapse } from "@mui/material"

export default function DeleteAlert(){
    const [open, setOpen] = useState(false)
    
    return(
        <Collapse in={open}><Alert
        icon={<Warning sx={{ mx: 0.5 }} />}
        variant="outlined"
        color='warning'
        sx={{marginTop:2, width:'85%'}}
        onClose={() => setOpen(false)}>
          Task was successfully deleted
      </Alert></Collapse>
    )
}