class SocketClient {
  clients = [];

  addClient = (ws) => {
    this.clients = [...this.clients, ws];
  };

  broadcast = (message) => {
    this.clients.forEach((client) => {
      client.send(message);
    });
  };
}

export const sockets = new SocketClient();
