import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategoriaSchema = Schema({
    id: {
        type: Number,
        required: [true, 'El id es obligatorio'],
        unique: true        
    },
    type: {
        type: String,
        required: [true, 'Debe definirse el tipo de propiedad'],
        unique: false 
    },
    number: {
        type: Number,
        required: [true, 'El número es obligatorio'],
        unique: false
    },
    size: {
        type: Number,
        required: [true, 'El tamaño es obligatorio'],
        unique: false
    },
    condominium_id: {
        type: Schema.Types.ObjectId,
        ref: 'Condominio',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


const Propiedad = model('Propiedad', CategoriaSchema);

export {
    Propiedad
};