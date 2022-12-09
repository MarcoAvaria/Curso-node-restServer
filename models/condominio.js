import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategoriaSchema = Schema({
    id: {
        type: Number,
        required: [true, 'El nombre es obligatorio'],
        unique: true        
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true 
    },
    province: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true 
    },
    rut: {
        type: Number,
        required: [true, 'El rut es obligatorio'],
        unique: true
    },
    properties: {
        type: Number,
        required: [true, 'La cantidad de properties es obligatoria'],
        unique: false
    },
    parkings: {
        type: Number,
        required: [true, 'La cantidad de parkings es obligatoria'],
        unique: false
    },
    commonplaces: {
        type: Number,
        required: [true, 'La cantidad de commonplaces es obligatoria'],
        unique: false
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


const Condominio = model('Condominio', CategoriaSchema);

export {
    Condominio
};