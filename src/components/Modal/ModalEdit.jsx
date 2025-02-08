import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

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
const StyledCancelButton = styled(Button)({
  backgroundColor: "##FAFAFA",
  color: "#fff",
  "&:hover": {
    backgroundColor: "##FAFAFA",
  },
  padding: "8px 16px",
  fontWeight: "bold",
});
const StyledSaveButton = styled(Button)({
  backgroundColor: "##FAFAFA",
  color: "#fff",
  "&:hover": {
    backgroundColor: "##FAFAFA",
  },
  padding: "8px 16px",
  fontWeight: "bold",
});
const ModalEdit = ({ open, onClose, onSave, initialName, initialNumber }) => {
  const [name, setName] = useState(initialName);
  const [number, setNumber] = useState(initialNumber);

  useEffect(() => {
    setName(initialName);
    setNumber(initialNumber);
  }, [initialName, initialNumber]);

  const handleSave = () => {
    onSave(name, number);
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-contact-dialog"
    >
      <StyledDialogTitle>Edit task</StyledDialogTitle>
      <Box sx={{ padding: "0 20px" }}>
        <TextField
          label="Task"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </Box>
      <StyledDialogActions>
        <StyledSaveButton variant="contained" onClick={handleSave}>
          Save
        </StyledSaveButton>
        <StyledCancelButton variant="contained" onClick={onClose}>
          Cancel
        </StyledCancelButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ModalEdit;
