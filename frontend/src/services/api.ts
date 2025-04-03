import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCodeforcesProfile = async (handle: string) => {
  const response = await api.get(`{$API_URL}profile/codeforces/${handle}`);
  return response.data;
};

export const getLeetcodeProfile = async (username: string) => {
  const response = await api.get(`{$API_URL}profile/leetcode/${username}`);
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await api.get('/leaderboard');
  return response.data;
};

export default api;