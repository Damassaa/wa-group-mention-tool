
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface StatusBadgeProps {
  connected: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ connected }) => {
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
      connected 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {connected ? (
        <Wifi className="h-4 w-4" />
      ) : (
        <WifiOff className="h-4 w-4" />
      )}
      {connected ? 'Conectado' : 'Desconectado'}
    </div>
  );
};

export default StatusBadge;
