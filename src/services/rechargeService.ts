import { cardisActive, cardIsBlocked, cardIsExpired, getCard } from "./cardsService.js"
import * as rechargeRepo from "../repositories/rechargeRepository.js"

const rechargeCard =async (id:number, amount: number) => {
	const card = await getCard(id);
	cardisActive(card.password, "check")
	cardIsExpired(card.expirationDate);
	cardIsBlocked(card.isBlocked, "recharge");

	await rechargeRepo.insert({cardId: id, amount})

	return
}

export {
	rechargeCard
}