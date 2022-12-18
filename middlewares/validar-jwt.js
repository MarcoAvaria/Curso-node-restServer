import { request, response } from 'express';
import { Usuario } from '../models/usuario.js';
import jwt from 'jsonwebtoken';

const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'Se necesita el token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById ( uid );

        if ( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }


        req.usuario = usuario;        
        
        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

export {
    validarJWT
}