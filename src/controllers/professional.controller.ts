import express from "express";
import {
  createProfessional,
  getProfessionals,
  getOneProfessional,
  updateProfessional,
} from "../services/professional.service";
import { logSuccess } from "../common/helpers/logger.helper";
import { ERoles, METHODS } from "../common/constants";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/professionals:
 *   post:
 *     summary: Crear un nuevo profesional
 *     tags: [Professionals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfessionalDTO'
 *     responses:
 *       201:
 *         description: Profesional creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalResponse'
 *       400:
 *         description: Error en los datos enviados
 */
router.post(
  "/",
  authMiddleware([ERoles.PROFESSIONAL]),
  async (req, res, next) => {
    try {
      const service = await createProfessional(req.body);
      res.status(201).send(service);
      logSuccess(METHODS.POST, req.originalUrl);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/professionals:
 *   get:
 *     summary: Obtener todos los profesionales
 *     tags: [Professionals]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *         description: Número de página para la paginación
 *     responses:
 *       200:
 *         description: Lista de profesionales
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FindAllProfessionalsResponse'
 *       400:
 *         description: Error en los parámetros de la consulta
 */
router.get("/", authMiddleware([ERoles.CLIENT]), async (req, res, next) => {
  try {
    const service = await getProfessionals(req.query);
    res.status(200).send(service);
    logSuccess(METHODS.GET, req.originalUrl);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/professionals/{id}:
 *   get:
 *     summary: Obtener un profesional por ID
 *     tags: [Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesional
 *     responses:
 *       200:
 *         description: Datos del profesional
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalResponse'
 *       404:
 *         description: Profesional no encontrado
 */
router.get(
  "/:id",
  authMiddleware([ERoles.CLIENT, ERoles.PROFESSIONAL]),
  async (req, res, next) => {
    try {
      const service = await getOneProfessional(req.params.id);
      res.status(200).send(service);
      logSuccess(METHODS.GET, req.originalUrl);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/professionals/{id}:
 *   patch:
 *     summary: Actualizar un profesional
 *     tags: [Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfessionalDTO'
 *     responses:
 *       204:
 *         description: Profesional actualizado
 *       404:
 *         description: Profesional no encontrado
 */
router.patch(
  "/:id",
  authMiddleware([ERoles.PROFESSIONAL]),
  async (req, res, next) => {
    try {
      const service = await updateProfessional(req.params.id, req.body);
      res.status(204).send(service);
      logSuccess(METHODS.PATCH, req.originalUrl);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
