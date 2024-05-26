// src/views/Repairs.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import RepairDialog from '../components/RepairDialog';
import RepairList from '../components/RepairList';
import RepairSearchBar from '../components/RepairSearchBar';
import RepairSearchDialog from '../components/RepairSearchDialog';
import RepairPropertySearchDialog from '../components/RepairPropertySearchDialog';
import RepairDateRangeSearchDialog from '../components/RepairDateRangeSearchDialog';
import dayjs from 'dayjs';

// Dummy data function
const getDummyRepairs = () => {
  return [
    {
      id: 1,
      typeOfRepair: 'PAINTING',
      description: 'Painting the living room',
      repairDate: dayjs().toISOString(),
      propertyId: 1,
      status: 'PENDING',
      isActive: true,
      cost: 100,
    },
    {
      id: 2,
      typeOfRepair: 'PLUMBING',
      description: 'Fixing the kitchen sink',
      repairDate: dayjs().toISOString(),
      propertyId: 2,
      status: 'IN_PROGRESS',
      isActive: true,
      cost: 150,
    },
  ];
};

const getDummyProperties = () => {
  return [
    { id: 1, name: 'Property 1' },
    { id: 2, name: 'Property 2' },
  ];
};

const Repairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openPropertySearch, setOpenPropertySearch] = useState(false);
  const [openDateRangeSearch, setOpenDateRangeSearch] = useState(false);
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [searchDate, setSearchDate] = useState(null);
  const [propertyId, setPropertyId] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRangeError, setDateRangeError] = useState('');
  const [filteredRepairs, setFilteredRepairs] = useState([]);
  const [newRepair, setNewRepair] = useState({
    typeOfRepair: '',
    description: '',
    repairDate: dayjs(),
    propertyId: '',
    status: 'PENDING',
    isActive: true,
    cost: 0,
  });

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const repairsData = getDummyRepairs();
        const propertiesData = getDummyProperties();
        setRepairs(repairsData);
        setFilteredRepairs(repairsData);
        setProperties(propertiesData);
      } catch (error) {
        setError('Error fetching repairs data');
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  const handleCreateOpen = () => {
    setOpenCreate(true);
  };

  const handleCreateClose = () => {
    setOpenCreate(false);
    setNewRepair({
      typeOfRepair: '',
      description: '',
      repairDate: dayjs(),
      propertyId: '',
      status: 'PENDING',
      isActive: true,
      cost: 0,
    });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewRepair((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setNewRepair((prev) => ({
      ...prev,
      repairDate: date,
    }));
  };

  const handleCreateSubmit = () => {
    const newId = repairs.length > 0 ? Math.max(...repairs.map((r) => r.id)) + 1 : 1;
    const createdRepair = { ...newRepair, id: newId, repairDate: newRepair.repairDate.toISOString(), cost: getRepairCost(newRepair.typeOfRepair) };
    console.log('Created repair:', createdRepair);
    setRepairs((prev) => [...prev, createdRepair]);
    setFilteredRepairs((prev) => [...prev, createdRepair]);
    handleCreateClose();
  };

  const getRepairCost = (typeOfRepair) => {
    switch (typeOfRepair) {
      case 'FRAMES':
        return 110;
      case 'PAINTING':
        return 100;
      case 'PLUMBING':
        return 150;
      case 'INSULATION':
        return 300;
      case 'ELECTRICAL_WORK':
        return 400;
      default:
        return 0;
    }
  };

  const handleUpdateRepair = (repair) => {
    console.log('Update repair:', repair);
  };

  const handleDeleteRepair = (repair) => {
    if (repair.isActive && repair.status === 'PENDING') {
      console.log('Delete repair:', repair);
      setRepairs((prev) => prev.filter((r) => r.id !== repair.id));
      setFilteredRepairs((prev) => prev.filter((r) => r.id !== repair.id));
    } else {
      setSelectedRepair(repair);
      setConfirmDeactivate(true);
    }
  };

  const handleDeactivateRepair = (repair) => {
    setRepairs((prev) =>
      prev.map((r) => (r.id === repair.id ? { ...r, isActive: false } : r))
    );
    setFilteredRepairs((prev) =>
      prev.map((r) => (r.id === repair.id ? { ...r, isActive: false } : r))
    );
    console.log('Deactivate repair:', repair);
    setConfirmDeactivate(false);
    setSelectedRepair(null);
  };

  const handleToggleActive = (repair) => {
    setRepairs((prev) =>
      prev.map((r) => (r.id === repair.id ? { ...r, isActive: !r.isActive } : r))
    );
    setFilteredRepairs((prev) =>
      prev.map((r) => (r.id === repair.id ? { ...r, isActive: !r.isActive } : r))
    );
    console.log('Toggle active state:', repair);
  };

  const handleConfirmDeactivateClose = () => {
    setConfirmDeactivate(false);
    setSelectedRepair(null);
  };

  const handleSearchOpen = () => {
    setOpenSearch(true);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
  };

  const handleSearchDateChange = (date) => {
    setSearchDate(date);
  };

  const handleSearchSubmit = () => {
    if (searchDate) {
      const filtered = repairs.filter((repair) =>
        dayjs(repair.repairDate).isSame(searchDate, 'day')
      );
      setFilteredRepairs(filtered);
    } else {
      setFilteredRepairs(repairs);
    }
    handleSearchClose();
  };

  const handlePropertySearchOpen = () => {
    setOpenPropertySearch(true);
  };

  const handlePropertySearchClose = () => {
    setOpenPropertySearch(false);
  };

  const handlePropertyIdChange = (e) => {
    setPropertyId(e.target.value);
  };

  const handlePropertySearchSubmit = () => {
    if (propertyId) {
      const filtered = repairs.filter((repair) =>
        repair.propertyId.toString() === propertyId
      );
      setFilteredRepairs(filtered);
    } else {
      setFilteredRepairs(repairs);
    }
    handlePropertySearchClose();
  };

  const handleDateRangeSearchOpen = () => {
    setOpenDateRangeSearch(true);
  };

  const handleDateRangeSearchClose = () => {
    setOpenDateRangeSearch(false);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleDateRangeSearchSubmit = () => {
    if (startDate && endDate) {
      if (startDate.isAfter(endDate)) {
        setDateRangeError('Start date cannot be after end date.');
      } else if (startDate.isSame(endDate)) {
        setDateRangeError('Start date and end date cannot be the same.');
      } else {
        const filtered = repairs.filter((repair) =>
          dayjs(repair.repairDate).isBetween(startDate, endDate, null, '[]')
        );
        setFilteredRepairs(filtered);
        setDateRangeError('');
        handleDateRangeSearchClose();
      }
    } else {
      setFilteredRepairs(repairs);
      handleDateRangeSearchClose();
    }
  };

  const handleCloseError = () => {
    setDateRangeError('');
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1877F2',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Repairs
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateOpen}
          sx={{ backgroundColor: '#1877F2' }}
        >
          Create New Repair
        </Button>
        <RepairSearchBar
          handleSearchOpen={handleSearchOpen}
          handlePropertySearchOpen={handlePropertySearchOpen}
          handleDateRangeSearchOpen={handleDateRangeSearchOpen}
        />
      </Box>
      <RepairList
        repairs={filteredRepairs}
        handleUpdate={handleUpdateRepair}
        handleDelete={handleDeleteRepair}
        handleDeactivate={handleDeactivateRepair}
        handleToggleActive={handleToggleActive}
      />
      <RepairDialog
        open={openCreate}
        onClose={handleCreateClose}
        repairData={newRepair}
        properties={properties}
        handleChange={handleCreateChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleCreateSubmit}
      />
      <RepairSearchDialog
        open={openSearch}
        onClose={handleSearchClose}
        searchDate={searchDate}
        handleSearchDateChange={handleSearchDateChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <RepairPropertySearchDialog
        open={openPropertySearch}
        onClose={handlePropertySearchClose}
        propertyId={propertyId}
        handlePropertyIdChange={handlePropertyIdChange}
        handlePropertySearchSubmit={handlePropertySearchSubmit}
      />
      <RepairDateRangeSearchDialog
        open={openDateRangeSearch}
        onClose={handleDateRangeSearchClose}
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleSearchSubmit={handleDateRangeSearchSubmit}
        error={dateRangeError}
        handleCloseError={handleCloseError}
      />
      <Dialog open={confirmDeactivate} onClose={handleConfirmDeactivateClose}>
        <DialogTitle>Cannot Delete Repair</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This repair cannot be deleted because it is not in PENDING status or is inactive. Would you like to deactivate it instead?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeactivateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeactivateRepair(selectedRepair)} color="secondary">
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Repairs;
