import mongoose from "mongoose";
import { Categoria } from "../models/categoria.js";
import { Role } from '../models/role.js';
import { Usuario } from '../models/usuario.js';
import { Producto } from "../models/producto.js";

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`)
    }
}

const emailExiste = async ( correo = '') => {
    
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    // const existeUsuario = await Usuario.findById(id);
    // if( !existeUsuario ){
    //     throw new Error(`El id: ${ id }, no existe`);
    // }
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById( id ).exec();
        if ( !existeUsuario ) {
            throw new Error(`El id ${ id } no existe`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido`);
    }
}

const existeCategoriaPorId = async (id) => {
    // const existeCategoria = await Categoria.findById(id);
    // if ( !existeCategoria ) {
    //     throw new Error(`El id: ${ id } no existe`)
    // }
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeCategoria = await Categoria.findById( id ).exec();
        if ( !existeCategoria ) {
            throw new Error(`El id ${ id } no existe`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido`);
    }
}

const existeProductoPorId = async (id) => {
    // const existeCategoria = await Categoria.findById(id);
    // if ( !existeCategoria ) {
    //     throw new Error(`El id: ${ id } no existe`)
    // }
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeProducto = await Producto.findById( id ).exec();
        if ( !existeProducto ) {
            throw new Error(`El id ${ id } no existe`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ){
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`); 
    }

    return true;
}

export {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}