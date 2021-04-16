import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

const HTTP_PORT = process.env.PORT || 8080;


const httpServer = createServer(app);


const wsServer = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});

wsServer.on("connection", (socket) => {
  console.log(socket);
});
httpServer.listen(HTTP_PORT,( ) => {
  console.log(`server is listing at ${HTTP_PORT}`);
  return 8000;
});
