import api from './index';

const userApi = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/user/register', userData);
      console.log('API register response:', response);
      if (response.data && response.data.token) {
        return response.data;
      } else {
        console.error('Unexpected register response structure:', response.data);
        throw new Error('Invalid register response');
      }
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/user/login', credentials);
      console.log('API login response:', response);
      if (response.data && response.data.accessToken) {
        return response.data;
      } else {
        console.error('Unexpected login response structure:', response.data);
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login API error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw error;
      }
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/user/logout');
      return response.data;
    } catch (error) {
      console.error('Logout API error:', error);
      throw error;
    }
  },

  // Get user profile
  getProfile: () => api.get('/user/profile'),

  // Update user email
  updateEmail: async (newEmail) => {
    try {
      const response = await api.put('/user/update', { newEmail });
      return response.data;
    } catch (error) {
      console.error('Update email API error:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to update email');
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw error;
      }
    }
  },

  // Delete user account
  deleteAccount: () => api.delete('/user/delete'),
  

  // Refresh token
  refreshToken: (refreshToken) => api.post('/user/refresh-token', { refreshToken }),

  // Get all point transactions
  getPointTransactions: (page = 1, limit = 10) => 
    api.get(`/user/points/transaction?page=${page}&limit=${limit}`),

  // Get a specific point transaction
  getPointTransactionById: (transactionId) => 
    api.get(`/user/points/transaction/${transactionId}`),

  // Exchange points
  exchangePoints: (points) => api.put('/user/points/exchanges', { points }),
};

export default userApi;