import { Router } from "express";
import { activateCard, createCard, getAllTransactions } from "../controllers/cardsController.js";
import keyAuthMiddleware from "../middlewares/keyAuthMiddleware.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import validateCardActivation from "../schemas/cardActivation.js";

const cardsRouter = Router();

cardsRouter.post("/create-card", keyAuthMiddleware, createCard);
cardsRouter.put("/activate-card", validateSchema(validateCardActivation), activateCard);
cardsRouter.get("/get-card-transactions", getAllTransactions);

export default cardsRouter;