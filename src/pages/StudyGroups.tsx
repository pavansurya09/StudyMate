import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudyGroups } from '../services/studyGroupService';
import { StudyGroup } from '../types';
import { Users, Calendar, MapPin, Clock, Search, Filter, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

const StudyGroups: React.FC = () => {
  const handleJoinGroup = (groupId: string) => {
    // Future: Add API call to backend here
    toast.success('Joined group successfully. An email will be sent to notify you so you won’t miss it.');
  };

  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    visibility: 'All',
    genderRestriction: 'All',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await fetchStudyGroups();
        setStudyGroups(data);
        setFilteredGroups(data);
      } catch (error) {
        console.error('Error loading study groups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGroups();
  }, []);

  useEffect(() => {
    let result = studyGroups;
    
    if (searchTerm) {
      result = result.filter(group => 
        group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.visibility !== 'All') {
      result = result.filter(group => group.visibility === filters.visibility);
    }
    
    if (filters.genderRestriction !== 'All') {
      result = result.filter(group => group.genderRestriction === filters.genderRestriction);
    }
    
    setFilteredGroups(result);
  }, [searchTerm, filters, studyGroups]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      visibility: 'All',
      genderRestriction: 'All',
    });
    setSearchTerm('');
  };

  const formatDateTime = (dateTimeString: string) => {
    try {
      return format(new Date(dateTimeString), 'MMM d, yyyy - h:mm a');
    } catch (e) {
      return dateTimeString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="mr-2 h-6 w-6 text-blue-500" />
            Study Groups
          </h1>
          <p className="text-gray-600 mt-1">Find or create study groups to collaborate with other students</p>
        </div>
        <Link
          to="/create-group"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Study Group
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by subject or venue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              Filters
            </button>
            
            {(filters.visibility !== 'All' || filters.genderRestriction !== 'All') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                  Visibility
                </label>
                <select
                  id="visibility"
                  value={filters.visibility}
                  onChange={(e) => handleFilterChange('visibility', e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="All">All</option>
                  <option value="Public">Public</option>
                  <option value="College-only">College-only</option>
                  <option value="Invite-only">Invite-only</option>
                </select>
              </div>
              <div>
                <label htmlFor="genderRestriction" className="block text-sm font-medium text-gray-700">
                  Gender Restriction
                </label>
                <select
                  id="genderRestriction"
                  value={filters.genderRestriction}
                  onChange={(e) => handleFilterChange('genderRestriction', e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="All">All</option>
                  <option value="Male">Male only</option>
                  <option value="Female">Female only</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500 mb-2">No study groups found matching your criteria.</p>
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.id} className="p-6 hover:bg-gray-50 transition duration-150">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{group.subject}</h3>
                    
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {formatDateTime(group.dateTime)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {group.venue}
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        group.visibility === 'Public' ? 'bg-green-100 text-green-800' :
                        group.visibility === 'College-only' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {group.visibility}
                      </span>
                      
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        group.genderRestriction === 'All' ? 'bg-gray-100 text-gray-800' :
                        group.genderRestriction === 'Male' ? 'bg-blue-100 text-blue-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {group.genderRestriction === 'All' ? 'Open to All' : `${group.genderRestriction} Only`}
                      </span>
                      
                      <span className="text-xs text-gray-500">
                        Created by {group.createdBy.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex-shrink-0">
                    <button   onClick={() => handleJoinGroup(group.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;



