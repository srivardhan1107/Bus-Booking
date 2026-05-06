import API from "../api/axios";

export const getAllBuses = () =>
  API.get("/api/buses");

export const getBusById = (id) =>
  API.get(`/api/buses/${id}`);

export const createBus = (busData) =>
  API.post("/api/buses", busData);

export const updateBus = (id, busData) =>
  API.put(`/api/buses/${id}`, busData);

export const deleteBus = (id) =>
  API.delete(`/api/buses/${id}`);