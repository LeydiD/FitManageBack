import express from "express";
import os from "os";
const port = process.env.PUERTO || 3000;
import Cliente from "./models/Cliente.js";
import Administrador from "./models/Administrador.js";
import Membresia from "./models/Membresia.js";
import Pago from "./models/Pago.js";
import Suscripcion from "./models/Suscripcion.js";
import Asistencia from "./models/Asistencia.js";
import db from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import clienteRoutes from "./routes/ClienteRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import membresiaRoutes from "./routes/MembresiaRoutes.js";
import pagoRoutes from "./routes/PagoRoutes.js";
import suscripcionRoutes from "./routes/SuscripcionRoutes.js";
import gananciaRoutes from "./routes/GananciaRoutes.js";
import asistenciaRoutes from "./routes/AsistenciaRoutes.js";
import reporteRoutes from "./routes/ReporteRoutes.js"
import rutinaRoutes from "./routes/RutinaRoutes.js";
dotenv.config({
  path: "./.env",
});

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));
/*
  //para la creacion de la bd 
  db.sync()
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.log("Error synchronizing database: ", error));
*/

const interfaces = os.networkInterfaces();
let localIP = "localhost"; // fallback

for (let name in interfaces) {
  for (let iface of interfaces[name]) {
    if (
      iface.family === "IPv4" &&
      !iface.internal &&
      iface.address.startsWith("192.168")
    ) {
      localIP = iface.address;
    }
  }
}

app.listen(process.env.PUERTO, () => {
  console.log(`API escuchando en http://localhost:${process.env.PUERTO}`);
});

app.get("/", (req, res) => {
  res.send("Hola Mundo desde mi primera API en Node.js!");
});

app.use("/clientes", clienteRoutes);
app.use("/auth", authRoutes);
app.use("/membresias", membresiaRoutes);
app.use("/pagos", pagoRoutes);
app.use("/suscripciones", suscripcionRoutes);
app.use("/ganancias", gananciaRoutes);
app.use("/asistencia", asistenciaRoutes);
app.use("/api", reporteRoutes);
app.use("/rutina", rutinaRoutes);
