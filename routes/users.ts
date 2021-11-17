import * as express from "express";
import * as dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

dotenv.config({ path: "./server/config.env" });

const router = express.Router();

router.post("/createAccount", async (req, res) => {
	const usersCollection = await loadCollection("Users", "users");

	var errors = [];

	const emailExists = await usersCollection
		.find({ email: req.body.email })
		.count();

	if (emailExists > 0) {
		errors.push("Email is already being used");
	}

	if (errors.length === 0) {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(req.body.password, salt, function (err, hash) {
				usersCollection.insertOne(
					{
						email: req.body.email,
						password: hash,
						accountCreatedAt: new Date(),
					},
					function (error, response) {
						if (error) {
							console.log("Error occurred while inserting");
						} else {
							usersCollection
								.findOne({ email: req.body.email })
								.then((user) => {
									jwt.sign(
										{ user },
										process.env.CRYPT_KEY as string,
										(err: any, token: any) => {
											if (err) res.status(404).send("Signature Failed");
											else res.status(201).send(token);
										}
									);
								});
						}
					}
				);
			});
		});
	} else {
		res.status(422).send(errors);
	}
});

router.post("/login", async (req, res) => {
	const usersCollection = await loadCollection("Users", "users");

	usersCollection.findOne({ email: req.body.email }).then((user) => {
		if (!user) {
			return res.status(404).send("User not found");
		}

		bcrypt.compare(req.body.password, user.password).then((isMatch) => {
			if (isMatch) {
				jwt.sign(
					{ user },
					process.env.CRYPT_KEY as string,
					(err: any, token: any) => {
						if (err) res.status(404).send("Signature Failed");
						else res.status(201).send(token);
					}
				);
			} else {
				res.status(404).send("Password Incorrect");
			}
		});
	});
});

const loadCollection = async (dbName: string, collectionName: string) => {
	const client = await MongoClient.connect(process.env.MONGODB_URI!);

	return client.db(dbName).collection(collectionName);
};

module.exports = router;
