import { Request, Response } from "express";
import { findById } from "../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, insert } from "../repositories/cardRepository.js";
import * as cardService from "../services/cardsService.js"

const createCard = async(req: Request, res: Response) => {
	const { id, type } = req.body;

	const employee = await findById(id);
	if (!employee) throw {type: "not-found", message: "Employee doesnt exist"}

	const alreadyHasCard = await findByTypeAndEmployeeId(type, id);
	if (alreadyHasCard) throw {type: "conflict", message: "Employee already has this type of card"}

	const { card, cardCVC } = cardService.createCard(employee.fullName, id, type);

	await insert(card)

	return res.status(201).send({
		number: card.number,
		name: card.cardholderName,
		securityCode: cardCVC,
		expDate: card.expirationDate
	})
}

const activateCard =async (req: Request, res: Response) => {
	const {id, cvc, password } = req.body;

	await cardService.activateCard(id, cvc, password);

	return res.sendStatus(201)
}

export {
	createCard,
	activateCard
}
