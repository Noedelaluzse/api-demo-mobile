const express = require('express');
const dbConnect = require('../database/config');
const cors = require('cors');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = {
            auth: '/api/auth',
            users: '/api/users',
        }

        // conectar a la base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

    async connectDB() {
        await dbConnect();
    }

    middlewares() {
    
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath.auth, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;