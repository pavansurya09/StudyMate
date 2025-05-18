import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudyGroup } from '../services/studyGroupService';
import { Users, Calendar, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateGroup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    venue: '',
    date: '',
    time: '',
    genderRestriction: 'All',
    visibility: 'Public',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Combine date and time into ISO string
      const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();
      
      await createStudyGroup({
        subject: formData.subject,
        venue: formData.venue,
        dateTime,
        genderRestriction: formData.genderRestriction as 'All' | 'Male' | 'Female',
        visibility: formData.visibility as 'Public' | 'College-only' | 'Invite-only',
      });
      
      toast.success('Study group created successfully!');
      navigate('/study-groups');
    } catch (error) {
      console.error('Error creating study group:', error);
      toast.error('Failed to create study group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Users className="mr-2 h-6 w-6 text-blue-500" />
          Create a Study Group
        </h1>
        <p className="text-gray-600 mt-1">
          Fill in the details to create a new study group
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject / Topic *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. Calculus II Exam Preparation"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                  Venue *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="venue"
                    id="venue"
                    required
                    value={formData.venue}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. Main Library, Room 204"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="pl-10 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Time *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="pl-10 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="genderRestriction" className="block text-sm font-medium text-gray-700">
                  Gender Restriction
                </label>
                <div className="mt-1">
                  <select
                    id="genderRestriction"
                    name="genderRestriction"
                    value={formData.genderRestriction}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="All">Open to All</option>
                    <option value="Male">Male Only</option>
                    <option value="Female">Female Only</option>
                  </select>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Specify if this study group is restricted to a specific gender
                </p>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                  Visibility
                </label>
                <div className="mt-1">
                  <select
                    id="visibility"
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="Public">Public (Visible to everyone)</option>
                    <option value="College-only">College-only (Only your college)</option>
                    <option value="Invite-only">Invite-only (Only visible with link)</option>
                  </select>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Control who can see and join your study group
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/study-groups')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? 'Creating...' : 'Create Study Group'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;