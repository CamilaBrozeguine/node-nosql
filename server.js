const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");
const app = express();
const PORT = 3000;
    
connectDB();

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuarioRoutes);
app.use("/favoritos", favoritoRoutes);

app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});