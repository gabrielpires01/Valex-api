import cors from "cors";
import express, { json } from "express";
import "./config/config.js"

const app = express();
app.use(cors());
app.use(json());


const port: number = +process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
})