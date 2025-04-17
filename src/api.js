// api.js - Using localStorage instead of JSONBin
const STORAGE_KEY = 'portfolio_data';

// Initialize default data structure if it doesn't exist
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const defaultData = {
      posts: [],
      projects: [],
      messages: [],
      adminPassword: null,
      security: {}
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

export const fetchData = async () => {
  try {
    return initializeData();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateData = async (newData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newData;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const setAdminPassword = async (password, security) => {
  const data = await fetchData();
  data.adminPassword = password;
  data.security = security;
  return updateData(data);
};
