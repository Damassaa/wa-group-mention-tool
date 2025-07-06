
import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface StatusMessageProps {
  type: 'success' | 'error' | 'info' | null;
  message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ type, message }) => {
  if (!type || !message) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-3 p-4 border rounded-lg ${getStyles()}`}>
      {getIcon()}
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default StatusMessage;
