/**
 * This class simulates a WebSocket connection for crypto price updates
 */
export class CryptoWebSocketMock {
  private intervalId: number | null = null;
  private callback: () => void;
  
  constructor(callback: () => void) {
    this.callback = callback;
  }
  
  /**
   * Start the WebSocket connection simulation
   * @param interval - The interval in milliseconds to simulate updates
   */
  connect(interval: number = 2000): void {
    if (this.intervalId !== null) {
      this.disconnect();
    }
    
    // Using setInterval to simulate WebSocket data streaming
    this.intervalId = window.setInterval(() => {
      this.callback();
    }, interval);
    
    console.log('WebSocket simulation connected');
  }
  
  /**
   * Stop the WebSocket connection simulation
   */
  disconnect(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('WebSocket simulation disconnected');
    }
  }
} 