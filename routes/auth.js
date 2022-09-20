import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { googleSingIn, login } from '../controllers/auth.js';

const router2 = Router();

router2.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La constraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router2.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);

export {
    router2
}