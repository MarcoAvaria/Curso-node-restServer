import mongoose from "mongoose";
import { Role } from '../models/role.js';
import { Usuario } from '../models/usuario.js';

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
    
    // Verificar si el correo existe

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

export {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}