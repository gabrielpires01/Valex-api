import Joi from "joi";

const validateCardPurchase = Joi.object({
	id: Joi.number().required(),
	businessId: Joi.number().required(),
	password: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
	amount: Joi.number().greater(0).required()
});

export {
	validateCardPurchase,
}