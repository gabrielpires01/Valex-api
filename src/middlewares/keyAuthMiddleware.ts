import { Response, Request, NextFunction } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";

const keyAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const apiKey = (req.headers["x-api-key"] || req.headers['x-api-key']) as string;
	if(!apiKey) throw {type: "missing-api", message: "Api key not found"}

	const company = await findByApiKey(apiKey)
	if (!company) throw {type: "not-exist", message: "api-key doesnt exist"}

	res.locals.company = company
	next();
	
}

export default keyAuthMiddleware;