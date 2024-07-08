import userApi from "../api/user";

export const logout = async () => {
    try {
      await userApi.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Redirect to login page or home page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error (show message to user, etc.)
    }
  };