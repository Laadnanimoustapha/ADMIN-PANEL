import React from 'react';
import { useNotification } from '../context/NotificationContext';

const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotification();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle text-success';
      case 'error':
        return 'fas fa-exclamation-circle text-danger';
      case 'warning':
        return 'fas fa-exclamation-triangle text-warning';
      case 'info':
      default:
        return 'fas fa-info-circle text-info';
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success bg-opacity-10 border-success';
      case 'error':
        return 'bg-danger bg-opacity-10 border-danger';
      case 'warning':
        return 'bg-warning bg-opacity-10 border-warning';
      case 'info':
      default:
        return 'bg-info bg-opacity-10 border-info';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            max-w-sm w-full shadow-lg rounded-lg pointer-events-auto border-l-4 p-4
            ${getNotificationBg(notification.type)}
            animate-fade-in toast-transition
          `}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <i className={`${getNotificationIcon(notification.type)} text-xl`}></i>
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-neutral-900">
                {notification.title}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {notification.message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => removeNotification(notification.id)}
                className="inline-flex text-neutral-400 hover:text-neutral-600 focus:outline-none focus:text-neutral-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;