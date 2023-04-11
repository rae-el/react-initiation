import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";
import DeleteAlert from "./DeleteAlert";

export default function DeleteDialog() {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleNo = () => {
      setOpen(false);
    };
    
    const handleYes = () => {
        //open delete alert and delete from list
      setOpen(false);
      return (<DeleteAlert/>)
    };
  
    return (
        <Dialog
          open={open}
          onClose={handleNo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText>
              Do you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNo}>No</Button>
            <Button onClick={handleYes} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    );
  }