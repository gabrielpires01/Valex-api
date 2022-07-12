import { findById, TransactionTypes, update } from "../repositories/cardRepository.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.PASSWORD);


const createCard = (fullName: String, id: number, type: TransactionTypes ) => {

	if(!type || !id) throw {type: "bad-request", message: "Missing something in the request"}

	const cardNumber = faker.finance.creditCardNumber();
	const cardCVC = faker.finance.creditCardCVV();
	const encryptedCVC = cryptr.encrypt(cardCVC);
	const expDate = createExpDate();
	const formatedName = formatName(fullName);

	const card = {
		employeeId: id,
		number: cardNumber,
		cardholderName: formatedName,
		securityCode: encryptedCVC,
		expirationDate: expDate,
		password: null,
		isVirtual: false,
		originalCardId: null,
		isBlocked: true,
		type
	}

	return card

}

const activateCard = async (id: number, cvc: string, password: string) => {
	const card = await getCard(id)
	if (card.password) throw {type: "forbidden", message: "Card already activated"}

	securityCodeIsEqual(card.securityCode, cvc)
	await cardIsExpired(card.expirationDate)

	const hashPassword = bcrypt.hashSync(password, 10);

	await update(id, {password: hashPassword, isBlocked: false})
	return 
}

const getCard = async (id: number) => {
	const card = await findById(id)
	if(!card) throw {type: "not-found", message: "Card doesnt exist"}

	return card
}

const cardIsExpired = async (expDate: string) => {
	if (expDate < new Date().toLocaleDateString("en-GB", { year: '2-digit', month: '2-digit'}).slice(3)) {
		throw {type: "not-acceptable", message: "Card ahs already expired"}
	}
	return
}

const securityCodeIsEqual = (encryptedCVC: string, CVC: string) => {
	const decriptedCVC = cryptr.decrypt(encryptedCVC);
	if (decriptedCVC !== CVC) throw {type: "not-acceptable", message: "Wrong cvc number"}

	return
}

const formatName = (fullname : String) => {
	const upperName = fullname.toUpperCase();
	const allNames = upperName.split(' ');
	const formatedName = allNames.map((name, index)=> {
		if(!index || index === allNames.length - 1) return name
		return name.length > 2? name[0] : ''
	}).join(' ').replace(/ +(?= )/g,'');

	return formatedName
}

const createExpDate = () => {
	const expDate = new Date();
	expDate.setFullYear(expDate.getFullYear() + 5)
	return expDate.toLocaleDateString("en-GB", { year: '2-digit', month: '2-digit'}).slice(3)
}


export {
	createCard,
	activateCard,
}