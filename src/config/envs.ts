import dotenv from "dotenv";

export function loadEnvs(){
	let path = ".env";
	if(process.env.NODE_ENV === "test"){
		let path = ".env.test";
	}
	dotenv.config({path});
} 