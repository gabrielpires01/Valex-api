import { Request, Response } from "express";
import * as cardService from "../services/cardsService.js"

const createCard = async(req: Request, res: Response) => {
	const { id, type } = req.body;

	const { card, cardCVC } = await cardService.createCard(id, type);

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
	const { id } = req.params;

	const transactions = await cardService.getTransactions(Number(id))

	return res.status(200).send(transactions)
}

const blockCard =async (req:Request, res: Response) => {
	const { id, password } = req.body;
	
	await cardService.blockCard(id, password, "block")

	return res.sendStatus(201)
}

const unblockCard =async (req:Request, res: Response) => {
	const { id, password } = req.body;
	
	await cardService.blockCard(id, password, "unblock")

	return res.sendStatus(201)
}

export {
	createCard,
	activateCard,
	getAllTransactions,
	blockCard,
	unblockCard,
}
