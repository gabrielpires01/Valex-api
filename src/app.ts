import cors from "cors";
import express, { json } from "express";
import 'express-async-errors'
import "./config/config.js"
import errorHandler from "./middlewares/errorHandler.js";
import Route from "./routers/index.js";

const app = express();
app.use(cors());
app.use(json());
app.use(Route);
app.use(errorHandler)

const port: number = +process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
})