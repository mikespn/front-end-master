// src/components/RepairItem.js
import React from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Stack,
} from '@mui/material';
import { Edit, Delete, ToggleOn, ToggleOff } from '@mui/icons-material';
import dayjs from 'dayjs';

const RepairItem = ({ repair, handleUpdate, handleDelete, handleDeactivate, handleToggleActive }) => {
  return (
    <ListItem key={repair.id} divider>
      <ListItemText
        primary={`${repair.typeOfRepair} - ${repair.description}`}
        secondary={`Date: ${dayjs(repair.repairDate).format('DD/MM/YYYY')} - Property ID: ${repair.propertyId} - Status: ${repair.status} - ${repair.isActive ? 'Active' : 'Inactive'} - Cost: €${repair.cost}`}
      />
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" onClick={() => handleUpdate(repair)}>
          <Edit />
        </IconButton>
        <IconButton color="primary" onClick={() => handleDelete(repair)}>
          <Delete />
        </IconButton>
        <IconButton
          style={{ color: repair.isActive ? 'green' : 'red' }}
          onClick={() => handleToggleActive(repair)}
        >
          {repair.isActive ? <ToggleOn /> : <ToggleOff />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default RepairItem;
