import { Router } from "express";
import purchase from "../controllers/purchasesController.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { validateCardPurchase } from "../schemas/purchaseSchema.js"

const purchaseRouter = Router();

purchaseRouter.post("/purchase", validateSchema(validateCardPurchase), purchase)

export default purchaseRouter