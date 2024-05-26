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
import repairService from '../api/repairService';
import dayjs from 'dayjs';

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
        const response = await repairService.getRepairs();
        setRepairs(response.data);
        setFilteredRepairs(response.data);
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

  const handleCreateSubmit = async () => {
    try {
      const createdRepair = { ...newRepair, repairDate: newRepair.repairDate.toISOString(), cost: getRepairCost(newRepair.typeOfRepair) };
      const response = await repairService.createRepair(createdRepair);
      setRepairs((prev) => [...prev, response.data]);
      setFilteredRepairs((prev) => [...prev, response.data]);
      handleCreateClose();
    } catch (error) {
      setError('Error creating repair');
    }
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

  const handleUpdateRepair = async (repair) => {
    try {
      const response = await repairService.updateRepair(repair.id, repair);
      setRepairs((prev) =>
        prev.map((r) => (r.id === repair.id ? response.data : r))
      );
      setFilteredRepairs((prev) =>
        prev.map((r) => (r.id === repair.id ? response.data : r))
      );
    } catch (error) {
      setError('Error updating repair');
    }
  };

  const handleDeleteRepair = async (repair) => {
    if (repair.isActive && repair.status === 'PENDING') {
      try {
        await repairService.deleteRepair(repair.id);
        setRepairs((prev) => prev.filter((r) => r.id !== repair.id));
        setFilteredRepairs((prev) => prev.filter((r) => r.id !== repair.id));
      } catch (error) {
        setError('Error deleting repair');
      }
    } else {
      setSelectedRepair(repair);
      setConfirmDeactivate(true);
    }
  };

  const handleDeactivateRepair = async (repair) => {
    try {
      const response = await repairService.deactivateRepair(repair.id);
      setRepairs((prev) =>
        prev.map((r) => (r.id === repair.id ? response.data : r))
      );
      setFilteredRepairs((prev) =>
        prev.map((r) => (r.id === repair.id ? response.data : r))
      );
      setConfirmDeactivate(false);
      setSelectedRepair(null);
    } catch (error) {
      setError('Error deactivating repair');
    }
  };

  const handleToggleActive = (repair) => {
    setRepairs((prev) =>
      prev.map((r) => (r.id === repair.id ? { ...r, isActive: !r.isActive } : r))
    );
    setFilteredRepairs((prev) =>
      prev.map((r) => (r.id === repair.id ? { ...r, isActive: !r.isActive } : r))
    );
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
        setDateRange
