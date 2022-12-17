const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGODB_URL)
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('error en la conexion a la DB')
    }
}

module.exports = {
    conectarDB
}