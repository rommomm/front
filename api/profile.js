import api from "../libs/api";

export default {
  get: () => api.get("/auth/me"),
  getUser: (username) => api.get(`/users/${username}`),
  updateProfile: () => api.put("/profile/update"),
  uploadAvatar: () => api.post("/profile/avatar"),
  removeAvatar: () => api.delete("/profile/avatar"),
  uploadBackground: () => api.post("/profile/background'"),
  removeBackground: () => api.delete("/profile/background'"),
};
