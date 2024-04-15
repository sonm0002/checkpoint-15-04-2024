import { DataSource } from "typeorm";

const dataSource = new DataSource({
	type: "sqlite",
	database: "./database.sqlite",
	entities: ["dist/entities/*.js"],
	synchronize: true,
	logging: ["query", "error"],
});

export default dataSource;
