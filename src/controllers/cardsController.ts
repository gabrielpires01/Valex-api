import { Request, Response } from "express";
import { findById } from "../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, insert } from "../repositories/cardRepository.js";
import * as cardService from "../services/cardsService.js"

const createCard = async(req: Request, res: Response) => {
	const { id, type } = req.body;

	const employee = await findById(id);
	if (!employee) return res.sendStatus(404)

	const alreadyHasCard = await findByTypeAndEmployeeId(type, id);
	if (alreadyHasCard) return res.sendStatus(401)

	const card = cardService.createCard(employee.fullName, id, type);

	await insert(card)

	return res.status(201).send("Card Created")
}

export {
	createCard,
}
