import { Router } from 'express';
import { check } from 'express-validator';

import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from '../controllers/uploads.js';
import { coleccionesPermitidas } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarArchivoSubir } from '../middlewares/validar-archivo.js';

const router6 = Router();

router6.post( '/', validarArchivoSubir, cargarArchivo );

router6.put('/:coleccion/:id', [
    validarArchivoSubir,
    check( 'id', 'El id debe ser de mongo').isMongoId(),
    check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagenCloudinary )
//], actualizarImagen )

router6.get('/:coleccion/:id', [
    check( 'id', 'El id debe ser de mongo').isMongoId(),
    check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen )


export {
    router6
}