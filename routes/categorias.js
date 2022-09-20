import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { esAdminRole } from '../middlewares/validar-roles.js';
import { crearCategoria,
         obtenerCategorias,
         obtenerCategoria,
         actualizarCategoria,
         borrarCategoria } from '../controllers/categorias.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';

const router3 = Router();

/** 
 * {{url}}/api/categorias
*/

// Obtener todas las categorias - público
router3.get('/', obtenerCategorias );
 
// Obtener una categoría por id - público
router3.get('/:id', [
    //check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria );

// Crear categoria - privado - cualquier persona con un token válido
router3.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar - privado - cualquier persona con un token válido
router3.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).notEmpty(),
    check( 'id' ).custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria);

// Borrar una categoría - admin
router3.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check( 'id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);

export {
    router3
}