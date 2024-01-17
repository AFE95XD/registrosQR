import express from "express";
import { obtenerDatos, registrar } from "../controllers/registroController.js";

const router = express.Router();

router.post("/registros", registrar);
router.get("/vQR/:id", obtenerDatos);

export default router;
