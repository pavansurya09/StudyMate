import api from './config';
import { Event } from '../types';
import { 
  mockFetchEvents, 
  mockSubmitEvent, 
  mockFetchPendingEvents, 
  mockApproveEvent, 
  mockRejectEvent 
} from '../mock/mockService';

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.get('/api/events');
    // return response.data;
    
    return mockFetchEvents();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const submitEvent = async (eventData: Omit<Event, 'id' | 'status' | 'submittedBy'>): Promise<Event> => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.post('/api/events/submit', eventData);
    // return response.data;
    
    return mockSubmitEvent(eventData);
  } catch (error) {
    console.error('Error submitting event:', error);
    throw error;
  }
};

// Admin-only endpoints
export const fetchPendingEvents = async (): Promise<Event[]> => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.get('/api/events/pending');
    // return response.data;
    
    return mockFetchPendingEvents();
  } catch (error) {
    console.error('Error fetching pending events:', error);
    throw error;
  }
};

export const approveEvent = async (eventId: string): Promise<Event> => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.put(`/api/events/${eventId}/approve`);
    // return response.data;
    
    return mockApproveEvent(eventId);
  } catch (error) {
    console.error('Error approving event:', error);
    throw error;
  }
};

export const rejectEvent = async (eventId: string): Promise<Event> => {
  try {
    // For demo purposes, using mock service instead of actual API call
    // const response = await api.put(`/api/events/${eventId}/reject`);
    // return response.data;
    
    return mockRejectEvent(eventId);
  } catch (error) {
    console.error('Error rejecting event:', error);
    throw error;
  }
};