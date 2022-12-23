import mongoose, { isValidObjectId } from "mongoose";
import { request, response } from "express";

import { Usuario } from "../models/usuario.js";
import { check } from 'express-validator';
import { existeUsuarioPorId } from "../helpers/db-validators.js";
import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";
//import { router } from "../routes/usuarios.js"



const coleccionesPermitidas = [    
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoId = isValidObjectId( termino ); // TRUE
    if ( esMongoId ) {
        
        const usuarioId = await Usuario.findById( termino );
        //console.log(`Usuarioid es: ${usuarioId}`);
        if ( usuarioId !== null ) {
            return res.json({
                results: usuarioId
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'El id no es válido!',
                results: []
            });
        }                
    } else { //Se crea una "expresión regular" RegExp, propio de JavaScript, que en esta caso es termino
        const regex = new RegExp( termino, 'i'); //la 'i' significa "insensible a las mayúsculas"
        const usuarios = await Usuario.find({ //en "find" hay propiedades propias de Mongo, con el caracter '$'
            $or: [{ nombre: regex }, { correo: regex}],
            $and: [{ estado: true }]
        });

        if ( !usuarios ) {
            return res.status(400).json({
                ok: false,
                msg: 'El id no es valido en ELSE',
                results: ['falla']
            });
        } else {
            return res.json({
                results: usuarios
            });
        }
    }
}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoId = isValidObjectId( termino ); // TRUE
    if ( esMongoId ) {
        
        const categoriaId = await Categoria.findById( termino );
        //console.log(`Categoriaid es: ${categoriaId}`);
        if ( categoriaId !== null ) {
            return res.json({
                results: categoriaId
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'El id no es válido!',
                results: []
            });
        }                
    } else {
        const regex = new RegExp( termino, 'i');
        const categorias = await Categoria.find({ nombre: regex, estado: true });

        if ( !categorias ) {
            return res.status(400).json({
                ok: false,
                msg: 'El id no es valido en ELSE',
                results: ['falla']
            });
        } else {
            return res.json({
                results: categorias
            });
        }
    }
}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoId = isValidObjectId( termino ); // TRUE
    if ( esMongoId ) {
        
        const productoId = await Producto.findById( termino ).populate( 'categoria', 'nombre');
        //console.log(`Productoid es: ${productoId}`);
        if ( productoId !== null ) {
            return res.json({
                results: productoId
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'El id no es válido!',
                results: []
            });
        }                
    } else {
        const regex = new RegExp( termino, 'i');
        const productos = await Producto.find({ nombre: regex, estado: true}).populate( 'categoria', 'nombre' );
        if ( !productos ) {
            return res.status(400).json({
                ok: false,
                msg: 'El id no es valido en ELSE',
                results: ['falla']
            });
        } else {
            return res.json({
                results: productos
            });
        }
    }
}

const buscar = ( req = request, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;

        case 'categorias':
            buscarCategorias( termino, res);
        break;

        case 'productos':
            buscarProductos( termino, res);
        break;
    
        default:
            return res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
    }
}

export {
    buscar
}