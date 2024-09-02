// src/services/formService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/forms';

export const formService = {
  createForm: async (formData) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth setup
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating form:', error);
      throw error;
    }
  },

  getUserForms: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forms:', error);
      throw error;
    }
  }
};