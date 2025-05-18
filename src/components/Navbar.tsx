import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Menu, X, LogOut, UserCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">StudyMate</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-blue-500 font-medium">
                    Dashboard
                  </Link>
                  <Link to="/study-groups" className="px-3 py-2 text-gray-700 hover:text-blue-500 font-medium">
                    Study Groups
                  </Link>
                  {isAdmin && (
                    <Link to="/admin/approve-events" className="px-3 py-2 text-gray-700 hover:text-blue-500 font-medium">
                      Manage Events
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Desktop user menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/study-groups"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Study Groups
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/approve-events"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Events
                  </Link>
                )}
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-3 py-2 text-gray-700 font-medium flex items-center">
                  <UserCircle className="h-5 w-5 mr-2" />
                  {user?.name}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 font-medium flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;