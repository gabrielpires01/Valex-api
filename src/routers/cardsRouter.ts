import { Router } from "express";
import { activateCard, createCard, getAllTransactions, blockCard, unblockCard } from "../controllers/cardsController.js";
import keyAuthMiddleware from "../middlewares/keyAuthMiddleware.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { validateCardActivation, validateCardAuth }from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/create-card", keyAuthMiddleware, createCard);
cardsRouter.put("/activate-card", validateSchema(validateCardActivation), activateCard);
cardsRouter.get("/get-card-transactions/:id", getAllTransactions);
cardsRouter.put("/block-card", validateSchema(validateCardAuth), blockCard);
cardsRouter.put("/unblock-card", validateSchema(validateCardAuth), unblockCard);

export default cardsRouter;