import axios from "axios";

// const api = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com",
//   headers: { "Content-Type": "application/json" },
// });

// export const getAll = () => api.get("/todos?_limit=10");
// export const createItem = (data) => api.post("/todos", data);
// export const updateItem = (id, data) => api.put(`/todos/${id}`, data);
// export const deleteItem = (id) => api.delete(`/todos/${id}`);

const API_URL = "https://jsonplaceholder.typicode.com";

export const getAll = () => axios.get(`${API_URL}/todos?_limit=10`);

export const createItem = (data) => axios.post(`${API_URL}/todos`, data);

export const updateItem = (id, data) =>
  axios.put(`${API_URL}/todos/${id}`, data);

export const deleteItem = (id) => axios.delete(`${API_URL}/todos/${id}`);
