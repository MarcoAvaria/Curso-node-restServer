import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRole, tieneRole } from '../middlewares/validar-roles.js';

import { 
    emailExiste,
    esRoleValido, 
    existeUsuarioPorId} from '../helpers/db-validators.js';

import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch } from '../controllers/usuarios.js';

const router = Router();

router.get('/', usuariosGet);

// router.put('/:id',[
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     //check('rol').custom( esRoleValido), // OJITO CON ESTO!
//     validarCampos
// ], usuariosPut);

router.put('/:id', [
    check('id').custom( existeUsuarioPorId ), // Aquí se realizan las dos validaciones
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/',[
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({ min: 6 }),
    //check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos

], usuariosPost);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE' ),
    check('id').custom( existeUsuarioPorId ), // Aquí se realizan las dos validaciones
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

export { router };