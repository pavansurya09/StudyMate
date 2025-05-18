

import { User, StudyGroup, Event } from '../types';
import { jwtDecode } from 'jwt-decode';

// Mock users
const users: User[] = [
  {
    id: '1',
    name: 'DemoUser Student',
    email: 'user@university.edu',
    college: 'University College',
    role: 'student'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@admin.com',
    college: 'Admin College',
    role: 'admin'
  }
];

// Mock study groups
const studyGroups: StudyGroup[] = [
  {
    id: '1',
    subject: 'Calculus II Exam Preparation',
    venue: 'Main Library, Room 204',
    dateTime: new Date(Date.now() + 86400000 * 2).toISOString(),
    genderRestriction: 'All',
    visibility: 'Public',
    createdBy: {
      id: '1',
      name: 'John Student'
    }
  },
  {
    id: '2',
    subject: 'Introduction to Machine Learning',
    venue: 'Computer Science Building, Lab 3',
    dateTime: new Date(Date.now() + 86400000 * 5).toISOString(),
    genderRestriction: 'All',
    visibility: 'College-only',
    createdBy: {
      id: '3',
      name: 'Sarah Johnson'
    }
  },
  {
    id: '3',
    subject: 'Women in STEM Discussion Group',
    venue: 'Engineering Building, Room 101',
    dateTime: new Date(Date.now() + 86400000 * 7).toISOString(),
    genderRestriction: 'Female',
    visibility: 'Public',
    createdBy: {
      id: '4',
      name: 'Lisa Rodriguez'
    }
  }
];

// Mock events
const events: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Hackathon',
    type: 'Hackathon',
    venue: 'Student Center, Main Hall',
    description: 'Join us for a 24-hour hackathon...',
    dateTime: new Date(Date.now() + 86400000 * 10).toISOString(),
    status: 'approved',
    submittedBy: {
      id: '1',
      name: 'John Student'
    }
  },
  {
    id: '2',
    title: 'Job Search Workshop',
    type: 'Workshop',
    venue: 'Career Center, Room 105',
    description: 'Learn effective strategies...',
    dateTime: new Date(Date.now() + 86400000 * 3).toISOString(),
    status: 'approved',
    submittedBy: {
      id: '3',
      name: 'Sarah Johnson'
    }
  },
  {
    id: '3',
    title: 'Guest Lecture: Advances in Quantum Computing',
    type: 'Lecture',
    venue: 'Physics Building, Auditorium',
    description: 'Dr. Robert Chen from Quantum Labs...',
    dateTime: new Date(Date.now() + 86400000 * 5).toISOString(),
    status: 'pending',
    submittedBy: {
      id: '4',
      name: 'Lisa Rodriguez'
    }
  }
];

// Auth
export const mockLogin = (email: string, password: string) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user);
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      college: user.college,
      role: user.role
    }
  };
};

export const mockRegister = (userData: any) => {
  const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
  if (existingUser) throw new Error('Email already registered');

  const newUser = {
    id: (users.length + 1).toString(),
    name: userData.name,
    email: userData.email.toLowerCase(),
    college: userData.college,
    role: userData.email.toLowerCase().endsWith('admin.com') ? 'admin' : 'student'
  };

  users.push(newUser);
  return { success: true };
};

export const mockFetchStudyGroups = () => [...studyGroups];

export const mockCreateStudyGroup = (groupData: any) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');

  const decoded = jwtDecode<any>(token);

  const newGroup = {
    id: (studyGroups.length + 1).toString(),
    ...groupData,
    createdBy: {
      id: decoded.sub,
      name: decoded.name
    }
  };

  studyGroups.push(newGroup);
  return newGroup;
};

export const mockFetchEvents = () => events.filter(e => e.status === 'approved');

export const mockSubmitEvent = (eventData: any) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');

  const decoded = jwtDecode<any>(token);

  const newEvent = {
    id: (events.length + 1).toString(),
    ...eventData,
    status: 'pending',
    submittedBy: {
      id: decoded.sub,
      name: decoded.name
    }
  };

  events.push(newEvent);
  return newEvent;
};

export const mockFetchPendingEvents = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');
  const decoded = jwtDecode<any>(token);
  if (decoded.role !== 'admin') throw new Error('Forbidden');
  return events.filter(e => e.status === 'pending');
};

export const mockApproveEvent = (eventId: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');
  const decoded = jwtDecode<any>(token);
  if (decoded.role !== 'admin') throw new Error('Forbidden');

  const event = events.find(e => e.id === eventId);
  if (!event) throw new Error('Event not found');
  event.status = 'approved';
  return event;
};

export const mockRejectEvent = (eventId: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');
  const decoded = jwtDecode<any>(token);
  if (decoded.role !== 'admin') throw new Error('Forbidden');

  const event = events.find(e => e.id === eventId);
  if (!event) throw new Error('Event not found');
  event.status = 'rejected';
  return event;
};

// Corrected Token Generator
function generateToken(user: User) {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    college: user.college,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  };

  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = "signature";

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}
