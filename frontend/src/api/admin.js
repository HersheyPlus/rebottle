import api from './index';

const adminApi = {
    getReports: async () => {
        try {
            const response = await api.get('/admin/get');
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Error getting reports');
            } else if (error.request) {
                throw new Error('No response received from server');
            } else {
                throw new Error('Error setting up the request');
            }
        }
    },
    getReportById: async (id) => {
        try {
            const response = await api.get(`/admin/get/${id}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Error getting report');
            } else if (error.request) {
                throw new Error('No response received from server');
            } else {
                throw new Error('Error setting up the request');
            }
        }
    },
    updateReport: async (id, reportData) => {
        try {
            const response = await api.put(`/admin/update/${id}`, reportData);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Error updating report');
            } else if (error.request) {
                throw new Error('No response received from server');
            } else {
                throw new Error('Error setting up the request');
            }
        }
    },
}

export default adminApi;