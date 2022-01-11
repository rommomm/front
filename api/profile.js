import api from "../libs/api";

export default {
  get: () => api.get("/auth/me"),
  getUser: (username) => api.get(`/users/${username}`),
};
