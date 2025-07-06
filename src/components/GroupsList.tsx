
import React from 'react';
import { Users, Loader2 } from 'lucide-react';
import { Group } from '@/types/WhatsApp';

interface GroupsListProps {
  groups: Group[];
  selectedGroupId: string | null;
  onGroupSelect: (group: Group) => void;
  loading: boolean;
}

const GroupsList: React.FC<GroupsListProps> = ({ 
  groups, 
  selectedGroupId, 
  onGroupSelect, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Grupos Disponíveis</h2>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            <p className="text-gray-500">Carregando grupos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Grupos Disponíveis</h2>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3 text-center">
            <Users className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500">Nenhum grupo disponível</p>
            <p className="text-sm text-gray-400">
              Conecte-se ao WhatsApp para ver seus grupos
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Grupos Disponíveis</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => onGroupSelect(group)}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedGroupId === group.id
                ? 'bg-green-50 border-green-200 shadow-sm'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">
                    {group.participantCount} participantes
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsList;
