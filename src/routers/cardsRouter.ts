import { Router } from "express";
import { activateCard, createCard } from "../controllers/cardsController.js";
import keyAuthMiddleware from "../middlewares/keyAuthMiddleware.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import validateCardActivation from "../schemas/cardActivation.js";

const cardsRouter = Router();

cardsRouter.post("/create-card", keyAuthMiddleware, createCard)
cardsRouter.put("/activate-card", keyAuthMiddleware, validateSchema(validateCardActivation), activateCard)

export default cardsRouter;