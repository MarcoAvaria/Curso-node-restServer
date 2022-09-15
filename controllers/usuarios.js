import { response } from 'express';

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit = 2} = req.query;

    res.json({
        //ok: true,
        msg: 'get API - usuariosGet',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
};

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        //ok: true,
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPost = (req, res = response) => {
    
    const { nombre, edad} = req.body;
    
    res.json({
        //ok: true,
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        //ok: true,
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        //ok: true,
        msg: 'delete API - usuariosDelete'
    });
}

export{
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}