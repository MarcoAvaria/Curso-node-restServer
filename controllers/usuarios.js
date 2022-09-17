import { response } from 'express';
import { Usuario } from '../models/usuario.js';
import bcryptjs from 'bcryptjs';

// import pkg from 'bcryptjs';
// const { bcryptjs } = pkg;

const usuariosGet = async (req = request, res = response) => {
    
    //const { q, nombre = 'No name', apikey, page = 1, limit = 2} = req.query;
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number( desde ))
            .limit(Number( limite ))
    ])

    res.json({
        total,
        usuarios        
    });
};

const usuariosPost = async (req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol} );

    // Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    // Guardar en BD

    await usuario.save();
    
    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    // TODO validar contra base de datos
    if ( password ){
        // Encriptar la constraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        //ok: true,
        //msg: 'put API - usuariosPut',
        usuario
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
        //ok: true,
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {
    
    const { id } = req.params;
    
    // Físicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(usuario);
}

export{
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}