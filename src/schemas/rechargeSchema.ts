import Joi from "joi";

const validateCardRecharge = Joi.object({
	id: Joi.number().required(),
	amount: Joi.number().greater(0).required()
});

export {
	validateCardRecharge,
}