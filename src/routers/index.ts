import { Router } from "express";
import cardsRouter from "./cardsRouter.js";
import rechargeRouter from "./rechargeRouter.js";

const Route = Router();

Route.use(cardsRouter)
Route.use(rechargeRouter)

export default Route