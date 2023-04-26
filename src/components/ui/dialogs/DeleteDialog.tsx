import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../../context/todoContext";
import { TodoContextType } from "../../../@types/Todo";
import { useNavigate } from "react-router-dom";


export default function DeleteDialog() {
  const {deleteThisTodo, handleDeleteDialog, deleteDialogOpen, getTodos, setDeleteAlertOpen, deleteId} = useContext(TodoContext) as TodoContextType
  const navigate = useNavigate()


  function handleYes(){
     //delete item
    handleDelete(deleteId)
    //recall todos
    getTodos()
    //close dialog
    handleDeleteDialog()
    //alert
    setDeleteAlertOpen(true)
    setTimeout(()=>{
      setDeleteAlertOpen(false)
    }, 50000)
    //navigate
    navigateToHome()

  }

    
  const handleDelete = async (id: string) => {
    deleteThisTodo(id)
  }
    
  const navigateToHome = () => {
    navigate('/');
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
              Are you sure you want to delete task {deleteId}?
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

