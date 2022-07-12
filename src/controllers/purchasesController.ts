import { Request, Response } from "express";
import * as purchaseService from "../services/purchasesService.js"

const purchase =async (req: Request,res: Response) => {
	const { id, password, businessId, amount } = req.body;

	await purchaseService.purchase(id, password, businessId, amount)

	return res.sendStatus(201)
}

export default purchase