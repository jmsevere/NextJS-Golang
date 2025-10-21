'use client';

import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client/react';
import { GET_LAST_PING, SEND_PING, LIVE_PING_SUBSCRIPTION } from '@/lib/graphql-operations';
import { GetLastPingData, SendPingData, SendPingVariables, LivePingData } from '@/lib/types';

export default function PingDisplay() {
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);

  const { data: queryData } = useQuery<GetLastPingData>(GET_LAST_PING);
  const [sendPing] = useMutation<SendPingData, SendPingVariables>(SEND_PING);
  const { data: subscriptionData } = useSubscription<LivePingData>(LIVE_PING_SUBSCRIPTION);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (queryData?.getLastPing?.timestamp) {
      setLastPingTime(queryData.getLastPing.timestamp);
    }
  }, [queryData]);

  useEffect(() => {
    if (subscriptionData?.livePing?.timestamp) {
      setLastPingTime(subscriptionData.livePing.timestamp);
    }
  }, [subscriptionData]);

  useEffect(() => {
    const schedulePing = () => {
      const randomDelay = Math.random() * 2000 + 1000;
      
      intervalRef.current = setTimeout(() => {
        sendPing({
          variables: {
            input: {
              timestamp: new Date().toISOString(),
            },
          },
        }).catch((error) => {
          console.error('Error sending ping:', error);
        });

        schedulePing();
      }, randomDelay);
    };

    schedulePing();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [sendPing]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Live Ping Monitor
        </h1>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl">
          <p className="text-white text-sm font-medium mb-2">Last Ping Timestamp:</p>
          {lastPingTime ? (
            <p className="text-white text-lg font-mono break-all">
              {new Date(lastPingTime).toLocaleString()}
              <br />
              {lastPingTime}
            </p>
          ) : (
            <p className="text-white/70 italic">No ping received yet...</p>
          )}
        </div>
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>🔄 Auto-pinging every 1-3 seconds</p>
          <p className="mt-2">📡 Real-time updates via WebSocket</p>
        </div>
      </div>
    </div>
  );
}
