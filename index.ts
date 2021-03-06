import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(bodyParser.json());

//Handle development
if (process.env.NODE_ENV === "development") {
	//Dev loggin
	app.use(morgan("dev"));

	//Access-Control-Allow-Origin: *
	app.use(cors());
}

//Routes
app.use("/", require("./routes/todo-logs"));
app.use("/", require("./routes/users"));

//Handle production
if (process.env.NODE_ENV === "production") {
	//Set static folder
	app.use(express.static(__dirname + "/build"));

	//Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + "/build/index.html"));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
