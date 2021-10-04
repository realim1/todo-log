const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

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
