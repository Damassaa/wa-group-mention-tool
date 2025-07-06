
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface DebugControlsProps {
  connectionState: 'connecting' | 'qr-waiting' | 'qr-scanned' | 'connected';
  onStateChange: (state: 'connecting' | 'qr-waiting' | 'qr-scanned' | 'connected') => void;
}

const DebugControls: React.FC<DebugControlsProps> = ({ connectionState, onStateChange }) => {
  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Settings className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Debug Controls</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={connectionState === 'connecting' ? 'default' : 'outline'}
          onClick={() => onStateChange('connecting')}
        >
          Conectando
        </Button>
        <Button
          size="sm"
          variant={connectionState === 'qr-waiting' ? 'default' : 'outline'}
          onClick={() => onStateChange('qr-waiting')}
        >
          QR Code
        </Button>
        <Button
          size="sm"
          variant={connectionState === 'qr-scanned' ? 'default' : 'outline'}
          onClick={() => onStateChange('qr-scanned')}
        >
          Escaneado
        </Button>
        <Button
          size="sm"
          variant={connectionState === 'connected' ? 'default' : 'outline'}
          onClick={() => onStateChange('connected')}
        >
          Conectado
        </Button>
      </div>
    </div>
  );
};

export default DebugControls;
