import api from "../libs/api";

export default {
  getAllPosts: () => api.get("/posts"),
  getUserPosts: (username) => api.get(`users/${username}/posts`),
  createPost: ({ content }) => api.post(`/posts`, { content }),
  updatePost: (id, updatedData) => api.put(`/posts/${id}`, updatedData),
  DeletePost: (id) => api.delete(`/posts/${id}`),
};
