import express from "express";
import {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
} from "../services/user.service";
import { logSuccess } from "../common/helpers/logger.helper";
import { ERoles, METHODS } from "../common/constants";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", async (req, res, next) => {
  try {
    const service = await createUser(req.body);
    res.status(201).send(service);
    logSuccess(METHODS.POST, req.originalUrl);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *         description: Número de página para la paginación
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FindAllUsersResponse'
 *       400:
 *         description: Error en los parámetros de la consulta
 */
router.get("/", authMiddleware([ERoles.ADMIN]), async (req, res, next) => {
  try {
    const service = await getUsers(req.query);
    res.status(200).send(service);
    logSuccess(METHODS.GET, req.originalUrl);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Usuario no encontrado
 */
router.get(
  "/:id",
  authMiddleware([ERoles.CLIENT, ERoles.PROFESSIONAL]),
  async (req, res, next) => {
    try {
      const service = await getOneUser(req.params.id);
      res.status(200).send(service);
      logSuccess(METHODS.GET, req.originalUrl);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
 *     responses:
 *       204:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 */
router.patch(
  "/:id",
  authMiddleware([ERoles.CLIENT, ERoles.PROFESSIONAL]),
  async (req, res, next) => {
    try {
      const service = await updateUser(req.params.id, req.body);
      res.status(204).send(service);
      logSuccess(METHODS.PATCH, req.originalUrl);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
