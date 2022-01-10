import api from "../libs/api";

export default {
  get: () => api.get("/auth/me"),
  getUser: (value) => api.get(`/users/${value}`),
};
