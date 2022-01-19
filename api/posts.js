import api from "../libs/api";

export default {
  getAllPosts: () => api.get("/posts"),
  createPost: ({ content }) => api.post(`/posts`, { content }),
  updatePost: (id, updatedData) => api.put(`/posts/${id}`, updatedData),
  DeletePost: (id) => api.delete(`/posts/${id}`),
  getUserPosts: (value) => api.get(`users/${value}/posts`),
};
