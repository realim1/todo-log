import * as express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: "./server/config.env" });

const router = express.Router();

router.post("/addTodoLog", async (req, res) => {
	const todoLogsCollection = await loadCollection("Todo-logs", "logItems");
	todoLogsCollection.insertOne(
		{
			date: req.body.date,
			todos: req.body.todos,
			completed: req.body.completed,
			blockers: req.body.blockers,
		},
		function (error, response) {
			if (error) {
				console.log("Error occurred while inserting");
			} else {
				res.status(201).send(response);
			}
		}
	);
});

router.get("/getTodoLogs", async (req, res) => {
	const todoLogsCollection = await loadCollection("Todo-logs", "logItems");
	todoLogsCollection.find({}).toArray(function (error, response) {
		if (error) {
			console.log("Error occured while retrieving logItems");
		} else {
			res.status(200).send(response);
		}
	});
});

router.delete("/removeTodoLog", (req, res) => {
	res.send("Removed Todo Log");
});

const loadCollection = async (dbName: string, collectionName: string) => {
	const client = await MongoClient.connect(process.env.MONGODB_URI!);

	return client.db(dbName).collection(collectionName);
};

module.exports = router;
