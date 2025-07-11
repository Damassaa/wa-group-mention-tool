
import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StatusBadge from '@/components/StatusBadge';
import GroupsList from '@/components/GroupsList';
import MessageComposer from '@/components/MessageComposer';
import StatusMessage from '@/components/StatusMessage';
import ConnectingScreen from '@/components/ConnectingScreen';
import QRCodeScreen from '@/components/QRCodeScreen';
import DebugControls from '@/components/DebugControls';
import { Group, MessageData, ConnectionStatus } from '@/types/WhatsApp';

const Index = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    lastUpdate: new Date(),
    state: 'connecting'
  });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });

  // Simular fluxo de conexão automático
  useEffect(() => {
    const simulateConnectionFlow = () => {
      // Inicia conectando
      setTimeout(() => {
        setConnectionStatus(prev => ({ ...prev, state: 'qr-waiting' }));
      }, 2000);

      // Simula escaneamento do QR
      setTimeout(() => {
        setConnectionStatus(prev => ({ ...prev, state: 'qr-scanned' }));
      }, 8000);

      // Conecta completamente
      setTimeout(() => {
        setConnectionStatus(prev => ({ 
          ...prev, 
          state: 'connected', 
          connected: true 
        }));
        loadDemoData();
      }, 12000);
    };

    simulateConnectionFlow();
  }, []);

  const loadDemoData = () => {
    const demoGroups: Group[] = [
      { id: '1', name: 'Família Silva', participantCount: 8 },
      { id: '2', name: 'Trabalho - Equipe Marketing', participantCount: 15 },
      { id: '3', name: 'Amigos da Faculdade', participantCount: 23 },
      { id: '4', name: 'Condomínio Edifício Central', participantCount: 45 },
      { id: '5', name: 'Grupo dos Vizinhos', participantCount: 12 }
    ];
    setGroups(demoGroups);
    setLoading(false);
  };

  const handleStateChange = (newState: 'connecting' | 'qr-waiting' | 'qr-scanned' | 'connected') => {
    setConnectionStatus(prev => ({
      ...prev,
      state: newState,
      connected: newState === 'connected'
    }));

    if (newState === 'connected' && groups.length === 0) {
      loadDemoData();
    }
  };

  const handleGroupSelect = (group: Group) => {
    setSelectedGroup(group);
    setStatusMessage({ type: null, message: '' });
  };

  const handleSendMessage = async (messageData: MessageData) => {
    setSending(true);
    setStatusMessage({ type: null, message: '' });

    try {
      // Simular envio de mensagem
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Mensagem enviada!",
        description: `Mensagem enviada para ${selectedGroup?.name} com sucesso.`,
      });
      
      setStatusMessage({
        type: 'success',
        message: `Mensagem enviada para "${selectedGroup?.name}" ${messageData.mentionAll ? 'mencionando todos os participantes' : ''}`
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setStatusMessage({
        type: 'error',
        message: 'Erro ao enviar mensagem. Tente novamente.'
      });
    } finally {
      setSending(false);
    }
  };

  const renderMainInterface = () => (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
        {/* Groups Panel */}
        <div className="lg:col-span-1">
          <GroupsList
            groups={groups}
            selectedGroupId={selectedGroup?.id || null}
            onGroupSelect={handleGroupSelect}
            loading={loading}
          />
        </div>

        {/* Message Composer Panel */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <MessageComposer
            selectedGroup={selectedGroup}
            onSendMessage={handleSendMessage}
            sending={sending}
          />
          
          {/* Status Message */}
          <StatusMessage
            type={statusMessage.type}
            message={statusMessage.message}
          />
        </div>
      </div>
    </main>
  );

  const renderConnectionScreen = () => {
    switch (connectionStatus.state) {
      case 'connecting':
        return <ConnectingScreen />;
      case 'qr-waiting':
        return <QRCodeScreen />;
      case 'qr-scanned':
        return <QRCodeScreen isScanned={true} />;
      default:
        return renderMainInterface();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Ferramenta de Menção WhatsApp
              </h1>
            </div>
            <StatusBadge connectionState={connectionStatus.state} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      {renderConnectionScreen()}

      {/* Debug Controls */}
      <DebugControls
        connectionState={connectionStatus.state}
        onStateChange={handleStateChange}
      />
    </div>
  );
};

export default Index;
