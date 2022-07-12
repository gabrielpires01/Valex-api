import { Router } from "express";
import cardsRouter from "./cardsRouter.js";
import purchaseRouter from "./purchaseRouter.js";
import rechargeRouter from "./rechargeRouter.js";

const Route = Router();

Route.use(cardsRouter);
Route.use(rechargeRouter);
Route.use(purchaseRouter);

export default Route