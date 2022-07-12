import { cardisActive, cardIsBlocked, cardIsExpired, getCard, getTransactions, passwordVerification } from "./cardsService.js"
import * as businnesRepo from "../repositories/businessRepository.js"
import * as paymentRepo from "../repositories/paymentRepository.js"

const purchase =async (id:number, password: string, businessId: number, amount: number) => {
	const card = await getCard(id);

	cardisActive(card.password, "check");
	cardIsExpired(card.expirationDate);
	cardIsBlocked(card.isBlocked, "purchase");
	await passwordVerification(card.password, password);

	const business = await businessIndexed(businessId);
	checkBusinessType(card.type, business.type)

	const cardBalance = (await getTransactions(id)).balance
 	balanceCheck(cardBalance, amount)

	await paymentRepo.insert({cardId: id, businessId, amount})

	return
}

const businessIndexed =async (id:number) => {
	const businnes = await 	businnesRepo.findById(id);
	if(!businnes) throw {type: "not-found", message: "business does not exist"}
	return businnes
};

const checkBusinessType = (cardType: string, businessType: string) => {
	if (cardType !== businessType) throw {type: "bad-request", message: "Wrong type of Card for this businnes"}
	return
};

const balanceCheck = (cardBalance: number, amount: number) => {
	if ( amount > cardBalance) throw {type: "bad-request", message: "Insufficient amount"}
	return
}

export { purchase }