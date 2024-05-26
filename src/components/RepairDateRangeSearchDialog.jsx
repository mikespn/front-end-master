// src/components/RepairDateRangeSearchDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RepairDateRangeSearchDialog = ({
  open,
  onClose,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleSearchSubmit,
  error,
  handleCloseError,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search Repairs by Date Range</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
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
      <Snackbar
        open={error !== ''}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default RepairDateRangeSearchDialog;
