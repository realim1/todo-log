import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const app = express();

//Handle development
if (process.env.NODE_ENV === "development") {
	//Dev loggin
	app.use(morgan("dev"));

	//Access-Control-Allow-Origin: *
	app.use(cors());
}

//Handle production
if (process.env.NODE_ENV === "production") {
	//Set static folder
	app.use(express.static(__dirname + "/public/"));

	//Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
