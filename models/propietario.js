import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategoriaSchema = Schema({
    id: {
        type: Number,
        required: [true, 'El id es obligatorio'],
        unique: true        
    },
    property_id: {
        type: Number,
        required: [true, 'El id es obligatorio'],
        unique: true        
    },
    rut: {
        type: Number,
        required: [true, 'El rut es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'El name es obligatorio'],
        unique: true        
    },
    number: {
        type: Number,
        required: [true, 'El número es obligatorio'],
        unique: false
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Propiedad',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


const Propietario = model('Propietario', CategoriaSchema);

export {
    Propietario
};