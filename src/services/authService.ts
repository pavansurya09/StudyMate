import api from './config';
import { RegisterData } from '../types';
import { mockLogin, mockRegister } from '../mock/mockService';

// Use mock service for now (in real app, this would use the API)
export const apiLogin = async (email: string, password: string) => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.post('/api/auth/login', { email, password });
    // return response.data;
    
    return mockLogin(email, password);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const apiRegister = async (userData: RegisterData) => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.post('/api/auth/register', userData);
    // return response.data;
    
    return mockRegister(userData);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};