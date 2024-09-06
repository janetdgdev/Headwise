// // src/services/formService.js
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/forms';

// export const formService = {
//   createForm: async (formData) => {
//     try {
//       const response = await axios.post(API_URL, formData, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth setup
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error creating form:', error);
//       throw error;
//     }
//   },

//   getUserForms: async () => {
//     try {
//       const response = await axios.get(API_URL, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching forms:', error);
//       throw error;
//     }
//   }
// };

const formStorageService = {
  // Save a single form
  saveForm: (formData) => {
    try {
      const formId = `form_${Date.now()}`;
      const existingForms = JSON.parse(
        localStorage.getItem("savedForms") || "[]"
      );

      const updatedForms = [
        ...existingForms,
        {
          id: formId,
          ...formData,
          createdAt: new Date().toISOString(),
        },
      ];

      localStorage.setItem("savedForms", JSON.stringify(updatedForms));
      return formId;
    } catch (error) {
      console.error("Failed to save form", error);
      return null;
    }
  },

  // Get all forms
  getAllForms: () => {
    try {
      const savedForms = localStorage.getItem("savedForms");
      return savedForms ? JSON.parse(savedForms) : [];
    } catch (error) {
      console.error("Failed to retrieve forms", error);
      return [];
    }
  },

  // Get a specific form by ID
  getFormById: (formId) => {
    const forms = formStorageService.getAllForms();
    return forms.find((form) => form.id === formId);
  },

  // Update an existing form
  updateForm: (formId, updatedData) => {
    try {
      const forms = formStorageService.getAllForms();
      const formIndex = forms.findIndex((form) => form.id === formId);

      if (formIndex !== -1) {
        forms[formIndex] = {
          ...forms[formIndex],
          ...updatedData,
          updatedAt: new Date().toISOString(),
        };

        localStorage.setItem("savedForms", JSON.stringify(forms));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to update form", error);
      return false;
    }
  },

  // Delete a form
  deleteForm: (formId) => {
    try {
      const forms = formStorageService.getAllForms();
      const filteredForms = forms.filter((form) => form.id !== formId);

      localStorage.setItem("savedForms", JSON.stringify(filteredForms));
      return true;
    } catch (error) {
      console.error("Failed to delete form", error);
      return false;
    }
  },
};