
export interface Group {
  id: string;
  name: string;
  participantCount: number;
}

export interface MessageData {
  groupId: string;
  message: string;
  mentionAll: boolean;
}

export interface ConnectionStatus {
  connected: boolean;
  lastUpdate: Date;
  state: 'connecting' | 'qr-waiting' | 'qr-scanned' | 'connected';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
