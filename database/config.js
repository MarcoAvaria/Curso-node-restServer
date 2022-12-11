import mongoose from "mongoose";
//Mongoose es un ODM (Object Data Modeling), que es como un modelador de objetos de información que
// se grabará en la base de datos, facilitanto query, lecturas y otras acciones/manipulaciones

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN);
        console.log('Base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la database');
    }
}

export {
    dbConnection
}