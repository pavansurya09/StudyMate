import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchStudyGroups } from '../services/studyGroupService';
import { fetchEvents } from '../services/eventService';
import { StudyGroup, Event } from '../types';
import { Calendar, Users, Clock, MapPin, BookOpen, Plus } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [groupsData, eventsData] = await Promise.all([
          fetchStudyGroups(),
          fetchEvents()
        ]);
        
        setStudyGroups(groupsData);
        // Only show approved events
        setEvents(eventsData.filter(event => event.status === 'approved'));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const formatDateTime = (dateTimeString: string) => {
    try {
      return format(new Date(dateTimeString), 'MMM d, yyyy - h:mm a');
    } catch (e) {
      return dateTimeString;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening around your campus.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/create-group"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Study Group
          </Link>
          <Link
            to="/submit-event"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Submit Event
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Study Groups */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Upcoming Study Groups
                </h2>
                <Link 
                  to="/study-groups" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {studyGroups.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-500">No upcoming study groups found.</p>
                  <Link 
                    to="/create-group" 
                    className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Create a new study group
                  </Link>
                </div>
              ) : (
                studyGroups.slice(0, 3).map((group) => (
                  <div key={group.id} className="px-6 py-4 hover:bg-gray-50 transition duration-150">
                    <div className="flex flex-col">
                      <h3 className="text-md font-medium text-gray-900">{group.subject}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {formatDateTime(group.dateTime)}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {group.venue}
                      </div>
                      <div className="mt-1 flex items-center text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          group.visibility === 'Public' ? 'bg-green-100 text-green-800' :
                          group.visibility === 'College-only' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {group.visibility}
                        </span>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          group.genderRestriction === 'All' ? 'bg-gray-100 text-gray-800' :
                          group.genderRestriction === 'Male' ? 'bg-blue-100 text-blue-800' :
                          'bg-pink-100 text-pink-800'
                        }`}>
                          {group.genderRestriction}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Upcoming Events
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {events.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-500">No upcoming events found.</p>
                  <Link 
                    to="/submit-event" 
                    className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Submit a new event
                  </Link>
                </div>
              ) : (
                events.slice(0, 3).map((event) => (
                  <div key={event.id} className="px-6 py-4 hover:bg-gray-50 transition duration-150">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-md font-medium text-gray-900">{event.title}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {event.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{event.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {formatDateTime(event.dateTime)}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {event.venue}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Resources */}
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
            Quick Links
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/study-groups"
            className="p-4 bg-blue-50 rounded-lg flex flex-col items-center justify-center hover:bg-blue-100 transition duration-150"
          >
            <Users className="h-8 w-8 text-blue-500" />
            <span className="mt-2 text-sm font-medium text-gray-900">Browse Study Groups</span>
          </Link>
          <Link
            to="/create-group"
            className="p-4 bg-green-50 rounded-lg flex flex-col items-center justify-center hover:bg-green-100 transition duration-150"
          >
            <Plus className="h-8 w-8 text-green-500" />
            <span className="mt-2 text-sm font-medium text-gray-900">Create a Study Group</span>
          </Link>
          <Link
            to="/submit-event"
            className="p-4 bg-purple-50 rounded-lg flex flex-col items-center justify-center hover:bg-purple-100 transition duration-150"
          >
            <Calendar className="h-8 w-8 text-purple-500" />
            <span className="mt-2 text-sm font-medium text-gray-900">Submit an Event</span>
          </Link>
          <a
            href="#"
            className="p-4 bg-orange-50 rounded-lg flex flex-col items-center justify-center hover:bg-orange-100 transition duration-150"
          >
            <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="mt-2 text-sm font-medium text-gray-900">Help Center</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;