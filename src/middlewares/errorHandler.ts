import { NextFunction, Request, Response } from "express";

interface Error {
	status?: number;
	type?: string;
	message: string;
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error.type === "missing-api") return res.status(404).send(error.message)
	if (error.type === "not-exist") return res.status(401).send(error.message)
	if (error.type === "missing") return res.status(400).send(error.message)
	return res.sendStatus(500)
}

export default errorHandler