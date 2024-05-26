// src/components/RepairPropertySearchDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';

const RepairPropertySearchDialog = ({
  open,
  onClose,
  propertyId,
  handlePropertyIdChange,
  handlePropertySearchSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search Repairs by Property ID</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Property ID"
            value={propertyId}
            onChange={handlePropertyIdChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handlePropertySearchSubmit} color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RepairPropertySearchDialog;
