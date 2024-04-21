class WebSocketService {
    private ws: WebSocket;

    constructor(url: string) {
        this.ws = new WebSocket(url);
    }

    // Method to send messages over WebSocket
    sendMessage(message: string) {
        this.ws.send(message);
    }

    // Event handlers
    onOpen(callback: () => void) {
        this.ws.onopen = callback;
    }

    onClose(callback: () => void) {
        this.ws.onclose = callback;
    }

    onError(callback: (error: Event) => void) {
        this.ws.onerror = callback;
    }

    onMessage(callback: (message: MessageEvent) => void) {
        this.ws.onmessage = callback;
    }

    // Method to close the WebSocket connection
    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default WebSocketService;
