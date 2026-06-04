import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const WS_URL = 'https://api.phantompathvpn.com';

export const useSocket = (accessCodeId) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!accessCodeId) return;

    const socket = io(`${WS_URL}/ws`, {
      transports: ['websocket', 'polling'],
      auth: { accessCodeId },
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 10,
    });

    socket.on('connect', () => {
      console.log('[PhantomPath] WS connected');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('[PhantomPath] WS disconnected');
      setConnected(false);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [accessCodeId]);

  const on = useCallback((event, handler) => {
    socketRef.current?.on(event, handler);
    return () => socketRef.current?.off(event, handler);
  }, []);

  const emit = useCallback((event, data) => {
    socketRef.current?.emit(event, data);
  }, []);

  return { connected, on, emit, socket: socketRef };
};

export default useSocket;
