import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ sidebarCollapsed, setSidebarCollapsed, setMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { showNotification } = useNotification();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showNotification('info', 'Search', `Searching for: ${searchQuery}`);
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #ORD-0006 from Alice Cooper',
      time: '2 minutes ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'System Update',
      message: 'Dashboard updated to version 2.1.0',
      time: '1 hour ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Payment Processed',
      message: 'Payment of $1,299 has been processed',
      time: '3 hours ago',
      type: 'success',
      unread: false
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-neutral-500 hover:text-neutral-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>

          {/* Desktop sidebar toggle */}
          <button
            className="hidden md:block text-neutral-500 hover:text-neutral-700"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-neutral-400"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-80 pl-10 pr-3 py-2 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Search orders, customers, products..."
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
              <i className="fas fa-plus mr-2"></i>
              New Order
            </button>
            <button className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
              <i className="fas fa-download mr-2"></i>
              Export
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            >
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger transform translate-x-1/2 -translate-y-1/2"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div className="p-4 border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">Notifications</h3>
                    <button className="text-sm text-primary hover:text-primary-dark">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-success' : 'bg-info'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-neutral-500 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-neutral-200">
                  <button className="w-full text-center text-sm text-primary hover:text-primary-dark">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AD</span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-neutral-900">Admin</div>
                <div className="text-xs text-neutral-500">Administrator</div>
              </div>
              <i className="fas fa-chevron-down text-xs text-neutral-400"></i>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div className="py-2">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    <i className="fas fa-user mr-3"></i>
                    Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    <i className="fas fa-cog mr-3"></i>
                    Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    <i className="fas fa-question-circle mr-3"></i>
                    Help & Support
                  </a>
                  <div className="border-t border-neutral-200 my-2"></div>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-neutral-400"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;