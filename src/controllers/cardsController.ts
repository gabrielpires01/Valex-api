import { Request, Response } from "express";
import * as employeeService from "../repositories/employeeRepository.js";
import * as cardRepo from "../repositories/cardRepository.js";
import * as cardService from "../services/cardsService.js"

const createCard = async(req: Request, res: Response) => {
	const { id, type } = req.body;

	const employee = await employeeService.findById(id);
	if (!employee) throw {type: "not-found", message: "Employee doesnt exist"}

	const alreadyHasCard = await cardRepo.findByTypeAndEmployeeId(type, id);
	if (alreadyHasCard) throw {type: "conflict", message: "Employee already has this type of card"}

	const { card, cardCVC } = cardService.createCard(employee.fullName, id, type);

	await cardRepo.insert(card)

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

const getAllTransactions =async (req:Request, res: Response) => {
	const { id } = req.body;

	const transactions = await cardService.getTransactions(id)

	return res.status(200).send(transactions)
}

export {
	createCard,
	activateCard,
	getAllTransactions
}
