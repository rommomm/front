import api from "../libs/api";

export default {
  get: () => api.get("/auth/me"),
  getUser: (username) => api.get(`/users/${username}`),
  updateProfile: (values) => api.put("/profile/update", values),
  uploadAvatar: (avatar) => api.post("/profile/avatar", avatar),
  removeAvatar: () => api.delete("/profile/avatar"),
  uploadBackground: (background) => api.post("/profile/background", background),
  removeBackground: () => api.delete("/profile/background"),
};
