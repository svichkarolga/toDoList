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
  backgroundColor: "#FAFAFA",
  color: "#333",
  "&:hover": {
    backgroundColor: "#E0E0E0",
  },
  padding: "8px 16px",
  fontWeight: "bold",
});
const StyledSaveButton = styled(Button)({
  backgroundColor: "#1976D2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#115293",
  },
  padding: "8px 16px",
  fontWeight: "bold",
});

const ModalEdit = ({ open, onClose, onSave, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave({ ...task, title, description });
      onClose();
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-task-dialog"
    >
      <StyledDialogTitle>Edit Task</StyledDialogTitle>
      <Box sx={{ padding: "0 20px" }}>
        <TextField
          label="Task"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <StyledDialogActions>
        <StyledSaveButton variant="contained" onClick={handleSave}>
          Save
        </StyledSaveButton>
        <StyledCancelButton variant="outlined" onClick={onClose}>
          Cancel
        </StyledCancelButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ModalEdit;
