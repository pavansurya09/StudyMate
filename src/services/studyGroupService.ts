import api from './config';
import { StudyGroup } from '../types';
import { mockFetchStudyGroups, mockCreateStudyGroup } from '../mock/mockService';

export const fetchStudyGroups = async (): Promise<StudyGroup[]> => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.get('/api/groups');
    // return response.data;
    
    return mockFetchStudyGroups();
  } catch (error) {
    console.error('Error fetching study groups:', error);
    throw error;
  }
};

export const createStudyGroup = async (groupData: Omit<StudyGroup, 'id' | 'createdBy'>): Promise<StudyGroup> => {
  try {
    return mockCreateStudyGroup(groupData);
  } catch (error) {
    console.error('Error creating study group:', error);
    throw error;
  }
};