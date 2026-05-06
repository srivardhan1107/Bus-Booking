import API from "../api/axios";

export const getAllSeats = () =>
  API.get("/api/seats");

export const getSeatById = (id) =>
  API.get(`/api/seats/${id}`);

export const createSeat = (seatData) =>
  API.post("/api/seats", seatData);

export const updateSeat = (id, seatData) =>
  API.put(`/api/seats/${id}`, seatData);

export const deleteSeat = (id) =>
  API.delete(`/api/seats/${id}`);