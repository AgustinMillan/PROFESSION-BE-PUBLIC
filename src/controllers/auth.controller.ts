import express from "express";
import { logSuccess } from "../common/helpers/logger.helper";
import { METHODS } from "../common/constants";
import { login } from "../services/auth.service";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesion
 *     tags: [Auths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Login completado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/loginResponse'
 *       401:
 *         description: Credenciales invalidas
 */
router.post("/login", async (req, res, next) => {
  try {
    const service = await login(req.body);
    res.status(200).send(service);
    logSuccess(METHODS.POST, req.originalUrl);
  } catch (error) {
    next(error);
  }
});

export default router;
