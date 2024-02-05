import Server from "./models/server";
import dotenv from 'dotenv';

// Configurando dot.env
dotenv.config();


const server = new Server();

server.listen()