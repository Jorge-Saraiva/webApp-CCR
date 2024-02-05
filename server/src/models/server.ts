import express, { Application } from "express";
import routesUsers from '../routes/user.routes';
import routesPlaces from '../routes/place.routes';
import connection from '../db/connection';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.connectDb();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicação rodando na porta " + this.port)
        })
    }

    middlewares() {
        this.app.use(express.json());

        // // Cors
        this.app.use(cors());
    }

    routes() {
        this.app.use('/users', routesUsers),
        this.app.use('/places', routesPlaces);
    }

    connectDb() {
        connection.connect((err: any) => {
            if (err) throw err;
            console.log('Conectado a base de dados')
        })
    }
}


export default Server;