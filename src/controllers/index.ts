import express from "express";
import UserController from "./user.controller";
import ProfessionalController from "./professional.controller";
import RoleController from "./role.controller";
import AuthController from "./auth.controller";
const router = express.Router();

router.use("/users", UserController);
router.use("/professionals", ProfessionalController);
router.use("/roles", RoleController);
router.use("/auth", AuthController);

export default router;
