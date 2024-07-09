import api from "./index";

const reportApi = {
  createReport: async (reportForm) => {
    try {
      const response = await api.post("/report/create", reportForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error creating report");
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Error setting up the request");
      }
    }
  },
  getReports: async () => {
    try {
      const response = await api.get("/report/get");
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error getting reports");
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Error setting up the request");
      }
    }
  },
  getReportById: async (id) => {
    try {
      const response = await api.get(`/report/get/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error getting report");
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Error setting up the request");
      }
    }
  },

  updateReport: async (id, reportData) => {
    try {
      let formData;
      if (reportData instanceof FormData) {
        formData = reportData;
      } else {
        formData = new FormData();
        Object.keys(reportData).forEach(key => {
          if (key === 'image' && reportData[key] instanceof File) {
            formData.append(key, reportData[key]);
          } else {
            formData.append(key, reportData[key]);
          }
        });
      }
  
      const response = await api.put(`/report/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error updating report");
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Error setting up the request");
      }
    }
  },

  cancelReport: async (id) => {
    try {
      const response = await api.put(`/report/cancel/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error cancelling report"
        );
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Error setting up the request");
      }
    }
  },
};

export default reportApi;
