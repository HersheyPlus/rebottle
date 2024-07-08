import api from "./index";

export const pointsApi = {
  exchangePoints: async (points) => {
    try {
      const response = await api.put('/user/points/exchanges', { points });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error exchanging points');
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error('Error setting up the request');
      }
    }
  }
};