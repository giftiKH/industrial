import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditUserForm from "./EditUserForm";

const EditUserDialog = ({ user, open, onClose, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Edit User
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <EditUserForm user={user} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
