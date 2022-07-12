import { Router } from "express";
import rechargeCard from "../controllers/rechargeController.js";
import keyAuthMiddleware from "../middlewares/keyAuthMiddleware.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { validateCardRecharge } from "../schemas/rechargeSchema.js"

const rechargeRouter = Router();

rechargeRouter.post("/recharge-card",keyAuthMiddleware, validateSchema(validateCardRecharge), rechargeCard)

export default rechargeRouter