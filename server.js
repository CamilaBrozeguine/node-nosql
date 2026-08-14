require('dotenv').config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const usuarioRoutes = require("./routes/usuarioRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas
  message: { message: 'Muitas tentativas, tente novamente em 15 minutos' }
});

connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth/login', limiter);
app.use('/auth/cadastrar', limiter);
app.use("/usuarios", usuarioRoutes);
app.use("/favoritos", favoritoRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});