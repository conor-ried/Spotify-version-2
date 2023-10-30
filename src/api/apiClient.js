import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3002';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token from local storage:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error("Token is missing!");  // Add this for debugging
  }
  return config;
}, (error) => {
  console.error("Interceptor error:", error);
  return Promise.reject(error);
});

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/users/auth/login', credentials);
    console.log('blah line 25 ApiClient.js ', response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    handleApiError(error);
  }
};

export const fetchSongs = async () => {
  try {
    const response = await apiClient.get('/songs');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    console.error("Error details:", error.response.data);
  }
  throw error;
};


// Fetch all playlists
export const fetchPlaylists = async () => {
  try {
    const response = await apiClient.get('/playlists');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch a single playlist by title
export const fetchPlaylist = async (title) => {
  try {
    const response = await apiClient.get(`/playlists/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create a new playlist
export const createPlaylist = async (playlistData) => {
  try {
    const response = await apiClient.post('/playlists', playlistData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update a playlist by title
export const updatePlaylist = async (title, updateData) => {
  try {
    const response = await apiClient.patch(`/playlists/${encodeURIComponent(title)}`, updateData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete a playlist by title
export const deletePlaylist = async (title) => {
  try {
    const response = await apiClient.delete(`/playlists/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const addSongToPlaylist = async (songId, playlistTitle) => {
  try {
    const response = await apiClient.post(`/songs/${songId}/add-to-playlist`, { playlistTitle });
    return response.data; // Or whatever payload you're expecting.
  } catch (error) {
    handleApiError(error);
  }
};

// Remove a song from a playlist
export const removeSongFromPlaylist = async (songId, playlistTitle) => {
  try {
    const response = await apiClient.delete(`/songs/${songId}/remove-from-playlist`, { data: { playlistTitle } });
    return response.data; // Or whatever payload you're expecting.
  } catch (error) {
    handleApiError(error);
  }
};