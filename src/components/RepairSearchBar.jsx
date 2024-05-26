// src/components/RepairSearchBar.js
import React from 'react';
import { Button, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

const RepairSearchBar = ({ handleSearchOpen, handlePropertySearchOpen, handleDateRangeSearchOpen }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Search />}
        onClick={handleSearchOpen}
        sx={{ backgroundColor: '#1877F2' }}
      >
        Search by Date
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Search />}
        onClick={handlePropertySearchOpen}
        sx={{ backgroundColor: '#1877F2' }}
      >
        Search by Property ID
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Search />}
        onClick={handleDateRangeSearchOpen}
        sx={{ backgroundColor: '#1877F2' }}
      >
        Search by Date Range
      </Button>
    </Box>
  );
};

export default RepairSearchBar;
