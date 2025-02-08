import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    backgroundColor: "#FAFAFA",
    borderRadius: "10px",
    padding: "20px",
    width: "400px",
    maxWidth: "100%",
  },
});
const StyledDialogTitle = styled(DialogTitle)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  color: "#333",
});
const StyledDialogActions = styled(DialogActions)({
  justifyContent: "center",
  paddingBottom: "1rem",
  fontSize: "1.5rem",
  color: "#333",
});
const StyledDeleteButton = styled(Button)({
  backgroundColor: "#FAFAFA",
  color: "#333",
  "&:hover": {
    backgroundColor: "#E0E0E0",
  },
  padding: "8px 16px",
  fontWeight: "bold",
});
const StyledCancelButton = styled(Button)({
  backgroundColor: "#1976D2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#115293",
  },
  padding: "8px 16px",
  fontWeight: "bold",
});

const ModalDelete = ({ open, onClose, onDelete }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
    >
      <StyledDialogTitle id="confirm-dialog">Delete task?</StyledDialogTitle>
      <DialogContent>
        <p>Are you shure that you want to delete task?</p>
      </DialogContent>
      <StyledDialogActions>
        <StyledCancelButton onClick={onClose} color="primary">
          No
        </StyledCancelButton>
        <StyledDeleteButton
          onClick={() => {
            onDelete();
            onClose();
          }}
          color="primary"
          autoFocus
        >
          Yes
        </StyledDeleteButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ModalDelete;
