
import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Group, MessageData } from '@/types/WhatsApp';

interface MessageComposerProps {
  selectedGroup: Group | null;
  onSendMessage: (messageData: MessageData) => void;
  sending: boolean;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ 
  selectedGroup, 
  onSendMessage, 
  sending 
}) => {
  const [message, setMessage] = useState('');
  const [mentionAll, setMentionAll] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup || !message.trim()) return;

    onSendMessage({
      groupId: selectedGroup.id,
      message: message.trim(),
      mentionAll
    });
  };

  const canSend = selectedGroup && message.trim() && !sending;

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Enviar Mensagem</h2>
      </div>
      
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grupo Selecionado
            </label>
            <div className="p-3 bg-gray-50 border rounded-lg">
              {selectedGroup ? (
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{selectedGroup.name}</span>
                  <span className="text-sm text-gray-500">
                    ({selectedGroup.participantCount} participantes)
                  </span>
                </div>
              ) : (
                <span className="text-gray-500">Nenhum grupo selecionado</span>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 min-h-32 resize-none border-gray-300 focus:border-green-500 focus:ring-green-500"
              disabled={!selectedGroup}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="mention-all"
              checked={mentionAll}
              onCheckedChange={(checked) => setMentionAll(checked as boolean)}
              disabled={!selectedGroup}
            />
            <label
              htmlFor="mention-all"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mencionar todos do grupo
            </label>
          </div>

          <Button
            type="submit"
            disabled={!canSend}
            className={`w-full h-12 text-white font-semibold ${
              canSend
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {sending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enviando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Enviar Mensagem
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageComposer;
