import nodemailer from "nodemailer";

export const enviarEmail = async (datos, codigoQR) => {
  const { nombre, email } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email
  const info = await transport.sendMail({
    from: "'Registro de eventos' <datosRicke@ventos.com>",
    to: email,
    subject: "Datos registrados correctamente",
    html: /*html*/ ` 
    <p>Hola ${nombre}, tus datos fueron registrados correctamente puedes escanear el siguiente codigo QR para visualizarlos:</p>
    <img src="${codigoQR}" alt="Codigo QR" />
    <p>Si no has sido tu, ignora este email</p>`,
  });
};
