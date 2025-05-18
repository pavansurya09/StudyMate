export interface User {
  id: string;
  name: string;
  email: string;
  college?: string;
  role: 'student' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  college?: string;
}

export interface StudyGroup {
  id: string;
  subject: string;
  venue: string;
  dateTime: string;
  genderRestriction: 'All' | 'Male' | 'Female';
  visibility: 'Public' | 'College-only' | 'Invite-only';
  createdBy: {
    id: string;
    name: string;
  };
  participants?: User[];
}

export interface Event {
  id: string;
  title: string;
  type: string;
  venue: string;
  description: string;
  dateTime: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: {
    id: string;
    name: string;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}