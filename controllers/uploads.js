import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { request, response } from "express";
import { subirArchivo } from "../helpers/subir-archivo.js";
import { Usuario } from "../models/usuario.js";
import { Producto } from "../models/producto.js";
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
//const CLOUDINARY_URL= 'cloudinary://562195387758218:h8JpZUjwJu_HvEsnSFqxwgkleyA@ds9jpufi4'
//cloudinary.config( process.env.CLOUDINARY_URL );
cloudinary.config({
    cloud_name: 'ds9jpufi4',
    api_key: '562195387758218',
    api_secret: 'h8JpZUjwJu_HvEsnSFqxwgkleyA'
  });

const cargarArchivo = async(req = request, res = response) => {

    try {
        // Imagenes
        //const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });
    } catch ( msg ) {
        res.status(400).json({ msg });
    }

}
    
const actualizarImagen = async(req = request, res = response) => {
    
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor... para ello se necesita del path | ruta
        console.log( modelo.img );
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img );
        console.log( modelo.img );
        if( fs.existsSync( pathImagen) ) {
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo );
}

const actualizarImagenCloudinary = async(req = request, res = response) => {
    
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor... para ello se necesita del path | ruta
        const nombreSplit = modelo.img.split('/');
        const nombre = nombreSplit [ nombreSplit.length - 1];
        const [ public_id ] = nombre.split('.');
        //console.log( public_id );
        await cloudinary.uploader.destroy( public_id );
        
    }
   
    
    const { tempFilePath } = req.files.archivo;
    //console.log( tempFilePath );
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;
    await modelo.save();

    res.json( modelo );    
    
    // const nombre = await subirArchivo(   req.files, undefined, coleccion );
}

const mostrarImagen = async( req = request, res = response ) => {
    
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor... para ello se necesita del path | ruta
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img );
        console.log( modelo.img );
        if( fs.existsSync( pathImagen) ) {
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg' );
    res.sendFile( pathImagen );
}

export {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}