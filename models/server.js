const express = require('express');
const dbConnect = require('../database/config');
const cors = require('cors');
const fileUpload = require('express-fileupload');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth: '/api/auth',
            items: '/api/items',
            uploads: '/api/uploads'
            
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

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.items, require('../routes/items'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;