
import React from 'react';
import { Smartphone, Loader2 } from 'lucide-react';

interface QRCodeScreenProps {
  isScanned?: boolean;
}

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ isScanned = false }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Conectar ao WhatsApp Web
        </h2>
        
        {/* QR Code Area */}
        <div className="mb-8 relative">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg mx-auto w-80 h-80 flex items-center justify-center">
            {/* Simulação do QR Code */}
            <div className="w-64 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
              <div className="text-gray-500 text-sm">QR Code</div>
              
              {/* Overlay quando escaneado */}
              {isScanned && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Aguardando confirmação...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              1
            </div>
            <p className="text-gray-700">Abra o WhatsApp no seu celular</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              2
            </div>
            <p className="text-gray-700">Toque em Menu (⋮) → Dispositivos conectados</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              3
            </div>
            <p className="text-gray-700">Toque em "Conectar um dispositivo"</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              4
            </div>
            <p className="text-gray-700">Aponte seu celular para esta tela para escanear o código</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-green-600">
          <Smartphone className="h-5 w-5" />
          <span className="text-sm font-medium">
            {isScanned ? 'Aguardando confirmação no celular...' : 'Escaneie o código QR com seu celular'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;
