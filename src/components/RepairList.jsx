// src/components/RepairList.js
import React from 'react';
import { List } from '@mui/material';
import RepairItem from './RepairItem';

const RepairList = ({ repairs, handleUpdate, handleDelete, handleDeactivate, handleToggleActive }) => {
  return (
    <List>
      {repairs.map((repair) => (
        <RepairItem
          key={repair.id}
          repair={repair}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleDeactivate={handleDeactivate}
          handleToggleActive={handleToggleActive}
        />
      ))}
    </List>
  );
};

export default RepairList;
