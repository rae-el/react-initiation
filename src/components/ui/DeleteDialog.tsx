import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useContext, useEffect, useState } from "react";
import DeleteAlert from "./DeleteAlert";
import { TodoService } from "../../Server/services/ToDos/TodoService";
import { TodoContext } from "../../context/todoContext";
import { TodoContextType } from "../../@types/Todo";

type Props = {

}

export default function DeleteDialog({id}:{ id: string}) {
  const {deleteThisTodo, handleDeleteDialog, deleteDialogOpen} = useContext(TodoContext) as TodoContextType

  function handleYes(){
    handleDeleteDialog()
    handleDelete(id)
  }

    
  const handleDelete = async (id: string) => {
    deleteThisTodo(id)
  }
    
  
    return (
        <Dialog
          open={deleteDialogOpen}
          onClose={()=>handleDeleteDialog()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText>
              Do you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleDeleteDialog()}>No</Button>
            <Button onClick={handleYes} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

