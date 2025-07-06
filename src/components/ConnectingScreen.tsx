
import React from 'react';
import { Loader2 } from 'lucide-react';

const ConnectingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center">
        <div className="mb-6">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Conectando ao WhatsApp...
        </h2>
        <p className="text-gray-600">
          Aguarde um momento
        </p>
      </div>
    </div>
  );
};

export default ConnectingScreen;
