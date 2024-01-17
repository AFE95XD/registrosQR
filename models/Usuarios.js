import mongoose from "mongoose";

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  puesto: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
});

const Usuarios = mongoose.model("Usuarios", UsuariosSchema);

export default Usuarios;
