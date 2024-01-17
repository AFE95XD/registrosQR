import qrCode from "qrcode";
import Usuarios from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
import { enviarEmail } from "../helpers/emails.js";

const registrar = async (req, res) => {
  try {
    const { nombre, email, telefono, puesto } = req.body;

    const usuario = new Usuarios({
      nombre,
      email,
      telefono,
      puesto,
      url: `${process.env.FRONTEND_URL}/vQR/${generarId()}`,
    });

    await usuario.save();

    // Generar el código QR
    const codigoQR = await qrCode.toDataURL(usuario.url);

    // Enviar el correo electrónico
    await enviarEmail(usuario, codigoQR);

    res.json({ msg: "Datos registrados correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerDatos = async (req, res) => {
  try {
    const url = `${process.env.FRONTEND_URL}/vQR/${req.params.id}`;
    const usuario = await Usuarios.findOne({ url }).select("-_id -__v -url");

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
  }
};

export { registrar, obtenerDatos };
