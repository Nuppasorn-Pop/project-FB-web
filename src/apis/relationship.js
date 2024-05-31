import axios from "../config/axios";

const relationshipApi = {};
relationshipApi.requestFriend = (receiverId) =>
  axios.post(`/relationships/users/${receiverId}`);

relationshipApi.cancelFriend = (receiverId) =>
  axios.delete(`/relationships/users/${receiverId}/cancel`);

export default relationshipApi;
