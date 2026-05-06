import API from "../api/axios";

export const getAllBookings = () =>
  API.get("/api/bookings");

export const getBookingById = (id) =>
  API.get(`/api/bookings/${id}`);

export const createBooking = (bookingData) =>
  API.post("/api/bookings", bookingData);

export const updateBooking = (id, bookingData) =>
  API.put(`/api/bookings/${id}`, bookingData);

export const deleteBooking = (id) =>
  API.delete(`/api/bookings/${id}`);