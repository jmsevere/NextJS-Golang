export interface Ping {
  id: string;
  timestamp: string;
}

export interface GetLastPingData {
  getLastPing: Ping | null;
}

export interface SendPingData {
  sendPing: Ping;
}

export interface SendPingVariables {
  input: {
    timestamp: string;
  };
}

export interface LivePingData {
  livePing: Ping;
}
