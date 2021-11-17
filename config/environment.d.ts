import { Secret } from "jsonwebtoken";
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGODB_URI: string;
			NODE_ENV: "development" | "production";
			PORT?: string;
			CRYPT_KEY: Secret;
		}
	}
}

export {};
