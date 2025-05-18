import React, { useState, useEffect } from 'react';
import { Calendar, Check, X, Clock, MapPin, User, FileText } from 'lucide-react';
import { fetchPendingEvents, approveEvent, rejectEvent } from '../../services/eventService';
import { Event } from '../../types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ApproveEvents: React.FC = () => {
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const loadPendingEvents = async () => {
      try {
        const events = await fetchPendingEvents();
        setPendingEvents(events);
      } catch (error) {
        console.error('Error loading pending events:', error);
        toast.error('Failed to load pending events');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPendingEvents();
  }, []);

  const handleApprove = async (eventId: string) => {
    setActionLoading(eventId);
    try {
      await approveEvent(eventId);
      setPendingEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Event approved successfully');
    } catch (error) {
      console.error('Error approving event:', error);
      toast.error('Failed to approve event');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (eventId: string) => {
    setActionLoading(eventId);
    try {
      await rejectEvent(eventId);
      setPendingEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Event rejected');
    } catch (error) {
      console.error('Error rejecting event:', error);
      toast.error('Failed to reject event');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    try {
      return format(new Date(dateTimeString), 'MMM d, yyyy - h:mm a');
    } catch (e) {
      return dateTimeString;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-blue-500" />
          Manage Event Requests
        </h1>
        <p className="text-gray-600 mt-1">
          Review and approve or reject event submissions from students
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Pending Events
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {pendingEvents.length} event{pendingEvents.length !== 1 ? 's' : ''} waiting for approval
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : pendingEvents.length === 0 ? (
          <div className="p-6 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No pending events</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no events waiting for approval at this time.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pendingEvents.map((event) => (
              <li key={event.id} className="p-6">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                        <div className="mt-1 flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {event.type}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            Submitted by {event.submittedBy.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {formatDateTime(event.dateTime)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {event.venue}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 lg:mt-0 lg:ml-4 flex flex-col sm:flex-row sm:space-x-3 lg:items-start">
                    <button
                      onClick={() => handleApprove(event.id)}
                      disabled={actionLoading === event.id}
                      className={`${
                        actionLoading === event.id ? 'opacity-50 cursor-not-allowed' : ''
                      } inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto mb-3 sm:mb-0`}
                    >
                      <Check className="-ml-1 mr-2 h-5 w-5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(event.id)}
                      disabled={actionLoading === event.id}
                      className={`${
                        actionLoading === event.id ? 'opacity-50 cursor-not-allowed' : ''
                      } inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto`}
                    >
                      <X className="-ml-1 mr-2 h-5 w-5" />
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApproveEvents;