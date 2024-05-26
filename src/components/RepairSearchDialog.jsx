// src/components/RepairSearchDialog.js
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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RepairSearchDialog = ({
  open,
  onClose,
  searchDate,
  handleSearchDateChange,
  handleSearchSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search Repairs by Date</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Repair Date"
              value={searchDate}
              onChange={handleSearchDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSearchSubmit} color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RepairSearchDialog;
