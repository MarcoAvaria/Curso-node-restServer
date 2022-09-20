import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { esAdminRole } from '../middlewares/validar-roles.js';
import { crearProducto,
         obtenerProductos,
         obtenerProducto, 
         actualizarProducto,
         borrarProducto } from '../controllers/productos.js';
import { existeCategoriaPorId, existeProductoPorId } from '../helpers/db-validators.js';

const router4 = Router();

/** 
 * {{url}}/api/productos
*/

// Obtener todas las productos - público
router4.get('/', obtenerProductos );

// Obtener una producto por id - público
router4.get('/:id', [
    //check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto );

// Crear producto - privado - cualquier persona con un token válido
router4.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto );

// Actualizar - privado - cualquier persona con un token válido
router4.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check( 'id' ).custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

// Borrar una categoría - admin
router4.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check( 'id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );

export {
    router4
}