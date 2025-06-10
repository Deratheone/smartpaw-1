import React from 'react';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

interface LoadingStateProps {
  type?: 'page' | 'inline' | 'button' | 'card';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showMessage?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'page',
  message = 'Loading...',
  size = 'md',
  showMessage = true
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    page: 'flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4',
    inline: 'flex items-center justify-center p-4',
    button: 'flex items-center justify-center',
    card: 'flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm'
  };

  return (
    <div className={containerClasses[type]}>
      <div className="relative">
        <Loader2 className={`animate-spin text-smartpaw-purple ${sizeClasses[size]}`} />
        {type === 'page' && (
          <div className="absolute -inset-2 rounded-full border-2 border-gray-200 animate-pulse" />
        )}
      </div>
      
      {showMessage && (
        <p className={`mt-3 text-gray-600 ${
          type === 'page' ? 'text-lg' : 'text-sm'
        } font-medium text-center`}>
          {message}
        </p>
      )}
      
      {type === 'page' && (
        <div className="mt-6 flex items-center text-xs text-gray-400">
          <Wifi className="h-3 w-3 mr-1" />
          <span>Connecting to SmartPaw...</span>
        </div>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  type?: 'page' | 'inline' | 'card';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  action,
  type = 'page'
}) => {
  const containerClasses = {
    page: 'flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4',
    inline: 'flex flex-col items-center justify-center p-4',
    card: 'flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm'
  };

  return (
    <div className={containerClasses[type]}>
      <div className="text-center max-w-md">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <WifiOff className="h-6 w-6 text-red-600" />
        </div>
        
        <h3 className={`font-semibold text-gray-900 mb-2 ${
          type === 'page' ? 'text-xl' : 'text-lg'
        }`}>
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-smartpaw-purple hover:bg-smartpaw-dark-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartpaw-purple transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingState;
