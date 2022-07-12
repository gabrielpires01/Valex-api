import { Router } from "express";
import { createCard } from "../controllers/cardsController.js";
import keyAuthMiddleware from "../middlewares/keyAuthMiddleware.js";

const cardsRouter = Router();

cardsRouter.post("/create-card", keyAuthMiddleware, createCard)


export default cardsRouter;