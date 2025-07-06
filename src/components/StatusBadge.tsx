
import React from 'react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  connectionState: 'connecting' | 'qr-waiting' | 'qr-scanned' | 'connected';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ connectionState }) => {
  const getStatusConfig = () => {
    switch (connectionState) {
      case 'connecting':
        return {
          icon: <Loader2 className="h-4 w-4 animate-spin" />,
          text: 'Conectando...',
          className: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        };
      case 'qr-waiting':
        return {
          icon: <WifiOff className="h-4 w-4" />,
          text: 'Desconectado',
          className: 'bg-red-100 text-red-800 border border-red-200'
        };
      case 'qr-scanned':
        return {
          icon: <Loader2 className="h-4 w-4 animate-spin" />,
          text: 'Conectando...',
          className: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        };
      case 'connected':
        return {
          icon: <Wifi className="h-4 w-4" />,
          text: 'Conectado',
          className: 'bg-green-100 text-green-800 border border-green-200'
        };
      default:
        return {
          icon: <WifiOff className="h-4 w-4" />,
          text: 'Desconectado',
          className: 'bg-red-100 text-red-800 border border-red-200'
        };
    }
  };

  const { icon, text, className } = getStatusConfig();

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      {icon}
      {text}
    </div>
  );
};

export default StatusBadge;
