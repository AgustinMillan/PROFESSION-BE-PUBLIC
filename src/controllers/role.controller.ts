import express from "express";
import { logSuccess } from "../common/helpers/logger.helper";
import { ERoles, METHODS } from "../common/constants";
import { createRole, getRoles, updateRole } from "../services/role.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleDTO'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", authMiddleware([ERoles.ADMIN]), async (req, res, next) => {
  try {
    const service = await createRole(req.body);
    res.status(201).send(service);
    logSuccess(METHODS.POST, req.originalUrl);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene la lista de roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 */
router.get("/", async (req, res, next) => {
  try {
    const service = await getRoles();
    res.status(200).send(service);
    logSuccess(METHODS.GET, req.originalUrl);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     summary: Actualiza un rol existente
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleDTO'
 *     responses:
 *       204:
 *         description: Rol actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Rol no encontrado
 */
router.patch("/:id", authMiddleware([ERoles.ADMIN]), async (req, res, next) => {
  try {
    const service = await updateRole(req.params.id, req.body);
    res.status(204).send(service);
    logSuccess(METHODS.PATCH, req.originalUrl);
  } catch (error) {
    next(error);
  }
});

export default router;
