import React from 'react';
import { Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Notifications() {
  const { notifications, markNotificationAsRead } = useStore();

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 border rounded-lg flex items-start space-x-4 ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex-shrink-0">
                {notification.type === 'document' && (
                  <Bell className="h-6 w-6 text-blue-600" />
                )}
                {notification.type === 'workflow' && (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
                {notification.type === 'system' && (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                )}
                {notification.type === 'deadline' && (
                  <Clock className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.createdAt.toLocaleString()}
                </p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
