const mongoose = require ('mongoose');
const connnectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/node_nosql");
        console.log("conectado ao banco de dados");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
};
module.exports = connnectDB;