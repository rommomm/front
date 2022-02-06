import api from "../libs/api";

export default {
  getAllPosts: (cursor) => api.get(`/posts/?cursor=${cursor}`),
  getUserPosts: (username) => api.get(`users/${username}/posts`),
  createPost: ({ content }) => api.post(`/posts`, { content }),
  updatePost: (id, updatedData) => api.put(`/posts/${id}`, updatedData),
  DeletePost: (id) => api.delete(`/posts/${id}`),
};
