import { Router } from "express";
import cardsRouter from "./cardsRouter.js";

const Route = Router();

Route.use(cardsRouter)

export default Route