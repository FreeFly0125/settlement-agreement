import { WebSocketServer } from "ws";
import { sockets } from "../socket/socketClients";

export const socketServer = new WebSocketServer({ port: 4004 });

socketServer.on("connection", function connection(ws) {
  console.log("New socket client connected!");

  ws.send(JSON.stringify({ type: "connect", message: "Successfully connected!" }));

  sockets.addClient(ws);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});
