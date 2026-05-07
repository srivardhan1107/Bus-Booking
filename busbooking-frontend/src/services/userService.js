import API from "../api/axios";

export const getAllUsers = () => API.get("/api/users");

export const getUserById = (id) =>
  API.get(`/api/users/${id}`);

export const createUser = (userData) =>
  API.post("/api/users", userData);

export const updateUser = (id, userData) =>
  API.put(`/api/users/${id}`, userData);

export const deleteUser = (id) =>
  API.delete(`/api/users/${id}`);