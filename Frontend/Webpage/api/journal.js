// journal.js
import axiosInstance from './axiosInstance';

export const saveJournal = async (journal) => {
  try {
    const response = await axiosInstance.post('/diary/', journal);
    return response.data;
  } catch (error) {
    console.error('Error saving journal:', error);
    throw error;
  }
};
