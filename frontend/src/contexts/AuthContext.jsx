/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// src/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../api/user';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userApi.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      logout();
    }
  };


  const register = async (email, password) => {
    console.log('Register function called with:', { email, password: '****' });
    try {
      const response = await userApi.register({ email, password });
      console.log('Registration response in AuthContext:', response);
      
      if (response && response.token) {
        localStorage.setItem('accessToken', response.token);
        setIsAuthenticated(true);
        await fetchUserProfile();
        return true;
      } else {
        throw new Error('Registration successful but no token received');
      }
    } catch (error) {
      console.error('Registration failed in AuthContext:', error);
      throw error;
    }
  };


  const login = async (email, password) => {
    try {
      const response = await userApi.login({ email, password });
      console.log('Login response in AuthContext:', response);
      
      if (response && response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        setIsAuthenticated(true);
        setUser(response.user);
        return true;
      } else {
        throw new Error('Login successful but no token received');
      }
    } catch (error) {
      console.error('Login failed in AuthContext:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await userApi.logout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    }
  };

  const value = {
    isAuthenticated,
    user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);