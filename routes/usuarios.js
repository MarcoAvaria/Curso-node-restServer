import { Router } from 'express';
import { check } from 'express-validator'; // Este check es un middleware se ocupa para las validaciones a revisar 

import  {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} from '../middlewares/index.js'

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

const router1 = Router();

router1.get('/', usuariosGet);

// router.put('/:id',[
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     //check('rol').custom( esRoleValido), // OJITO CON ESTO!
//     validarCampos
// ], usuariosPut);

router1.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), 
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router1.post('/',[
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({ min: 6 }),
    //check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos

], usuariosPost);

router1.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE' ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), // Aquí se realizan las dos validaciones
    validarCampos
], usuariosDelete);

router1.patch('/', usuariosPatch);

export { router1 };