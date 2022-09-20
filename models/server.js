import express from 'express';
import cors from 'cors';
//const app = express();
import { router } from '../routes/usuarios.js';
import { router2 } from '../routes/auth.js';
import { router3 } from '../routes/categorias.js';
import { router4 } from '../routes/productos.js';
import { router5 } from '../routes/buscar.js';
import { dbConnection } from '../database/config.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar', 
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios'
        }
        
        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        
        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.auth, router2);
        this.app.use( this.paths.buscar, router5)
        this.app.use( this.paths.categorias, router3);
        this.app.use( this.paths.usuarios, router);
        this.app.use( this.paths.productos, router4)
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export { Server };