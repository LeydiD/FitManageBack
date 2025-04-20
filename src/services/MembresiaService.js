import membresia from "../models/Membresia.js";
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from "../errors/Errores.js";

export async function listarMembresias() {
  try {
    const membresias = await membresia.findAll();
    return membresias;
  } catch (error) {
    throw new Error("Error al obtener las membresías: " + error.message);
  }
}

export async function crearMembresia(nuevaMembresia) {
  try {
    const nueva = await membresia.create(nuevaMembresia);
    return nueva;
  } catch (error) {
    throw new Error("Error al crear la membresía: " + error.message);
  }
}

export async function buscarPorId(id_membresia) {
  if (!id_membresia || isNaN(id_membresia)) {
    throw new BadRequestError("El id no es válido");
  }
  try {
    const membresiaBuscada = await membresia.findByPk(id_membresia);

    if (!membresiaBuscada) {
      throw new NotFoundError("Membresia no encontrada");
    }
    return membresiaBuscada;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError("Error interno del servidor");
  }
}

export async function actualizarMembresia(id_membresia, { tipo, precio }) {
  try {
    const membresiaActualizar = await membresia.findByPk(id_membresia);
    if (!membresiaActualizar) {
      throw new Error("Membresía no encontrada");
    }

    if (tipo) membresiaActualizar.tipo = tipo;
    if (precio) membresiaActualizar.precio = precio;

    await membresiaActualizar.save();
    return membresiaActualizar;
  } catch (error) {
    throw new Error("Error al actualizar la membresía: " + error.message);
  }
}
