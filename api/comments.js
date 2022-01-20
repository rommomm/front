import api from "../libs/api";

export default {
  getAllComments: () => api.get(`/comments`),
  getAllCommentsByPosts: (id) => api.get(`/posts/${id}/comments`),
  createComment: (id, comment) => api.post(`/posts/${id}/comments`, comment),
  updateComment: (id, updatedData) => api.put(`/comments/${id}`, updatedData),
  deleteComment: (id) => api.delete(`/comments/${id}`),
};
