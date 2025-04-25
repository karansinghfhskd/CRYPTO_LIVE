import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { CryptoWebSocketMock } from '../services/cryptoWebSocketMock';
import { updatePricesStart, updatePricesSuccess, updatePricesFailure } from '../store/cryptoSlice';

/**
 * Custom hook to handle the WebSocket connection for crypto price updates
 * @param interval - Update interval in milliseconds (default: 2000ms)
 */
export const useCryptoWebSocket = (interval: number = 2000) => {
  const dispatch = useDispatch();
  const wsRef = useRef<CryptoWebSocketMock | null>(null);

  // Effect to connect to the WebSocket and handle cleanup
  useEffect(() => {
    // Create callback function that will dispatch Redux actions
    const handleUpdate = () => {
      try {
        dispatch(updatePricesStart());
        dispatch(updatePricesSuccess());
      } catch (error) {
        dispatch(updatePricesFailure(error instanceof Error ? error.message : 'Unknown error'));
      }
    };
    
    // Create the WebSocket mock instance
    wsRef.current = new CryptoWebSocketMock(handleUpdate);
    
    // Connect to the WebSocket
    wsRef.current.connect(interval);
    
    // Clean up on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, [dispatch, interval]);
  
  // Return methods to manually control the connection
  return {
    reconnect: () => {
      wsRef.current?.disconnect();
      wsRef.current?.connect(interval);
    },
    disconnect: () => {
      wsRef.current?.disconnect();
    }
  };
}; 