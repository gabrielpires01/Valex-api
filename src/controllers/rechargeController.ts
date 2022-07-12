import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js"

const rechargeCard =async (req:Request, res: Response) => {
	const { id, amount } = req.body;

	await rechargeService.rechargeCard(id, amount)

	return res.sendStatus(201)
}

export default rechargeCard