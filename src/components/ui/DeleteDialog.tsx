import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useEffect, useState } from "react";
import DeleteAlert from "./DeleteAlert";
import { TodoService } from "../../Server/services/ToDos/TodoService";

export default function DeleteDialog({open, id}:{ open: boolean; id: number}) {
  const todoService = new TodoService()
  const [dialogOpen, setDialogOpen] = useState(open)


  useEffect(()=> {
    setDialogOpen(open)
  },[open])


  function handleYes(){
    setDialogOpen(false)
    handleDelete(id)
  }

    
  const handleDelete = async (id: number) => {
    const response = await todoService.deleteTodo(id)
    console.log(response)
  }
    
  
    return (
        <Dialog
          open={dialogOpen}
          onClose={()=>setDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText>
              Do you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setDialogOpen(false)}>No</Button>
            <Button onClick={handleYes} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

