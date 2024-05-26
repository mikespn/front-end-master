// src/components/RepairDialog.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RepairDialog = ({
  open,
  onClose,
  repairData,
  properties,
  handleChange,
  handleDateChange,
  handleSubmit,
}) => {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const calculateCost = () => {
      switch (repairData.typeOfRepair) {
        case 'FRAMES':
          setCost(110);
          break;
        case 'PAINTING':
          setCost(100);
          break;
        case 'PLUMBING':
          setCost(150);
          break;
        case 'INSULATION':
          setCost(300);
          break;
        case 'ELECTRICAL_WORK':
          setCost(400);
          break;
        default:
          setCost(0);
      }
    };

    calculateCost();
  }, [repairData.typeOfRepair]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Repair</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Type of Repair"
            name="typeOfRepair"
            value={repairData.typeOfRepair}
            onChange={handleChange}
            select
          >
            <MenuItem value="PAINTING">Painting</MenuItem>
            <MenuItem value="INSULATION">Insulation</MenuItem>
            <MenuItem value="FRAMES">Frames</MenuItem>
            <MenuItem value="PLUMBING">Plumbing</MenuItem>
            <MenuItem value="ELECTRICAL_WORK">Electrical Work</MenuItem>
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={repairData.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Repair Date"
              value={repairData.repairDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            label="Property"
            name="propertyId"
            value={repairData.propertyId}
            onChange={handleChange}
            select
          >
            {properties.map((property) => (
              <MenuItem key={property.id} value={property.id}>
                {property.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Cost of Repair (€)"
            value={cost}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RepairDialog;
