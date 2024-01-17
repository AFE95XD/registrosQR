import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import rutas from "./routes/rutas.js";
import conectarDB from "./config/db.js";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin);
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No puede consultar la API
      callback(new Error("No permitido por CORS"));
    }
  },
};

// Habilitar CORS
app.use(cors(corsOptions));

app.use("/api", rutas);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
