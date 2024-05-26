import axiosInstance from './axios';

const repairService = {
  getRepairs: () => axiosInstance.get('/repairs'),
  createRepair: (repairData) => axiosInstance.post('/repairs', repairData),
  updateRepair: (repairId, repairData) => axiosInstance.put(`/repairs/${repairId}`, repairData),
  deleteRepair: (repairId) => axiosInstance.delete(`/repairs/${repairId}`),
  deactivateRepair: (repairId) => axiosInstance.put(`/repairs/${repairId}/deactivate`),
};

export default repairService;
