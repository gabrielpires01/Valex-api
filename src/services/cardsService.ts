import { TransactionTypes } from "../repositories/cardRepository.js";
import { faker } from "@faker-js/faker";

import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.PASSWORD);


const createCard = (fullName: String, id: number, type: TransactionTypes ) => {

	if(!type || !id) throw {type: "missing", message: "Missing something in the request"}

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
}