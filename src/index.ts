import "reflect-metadata";
import dataSource from "./config/db";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { CountryResolver } from "./resolvers/Country";
import { Country } from "./entities/Country";

const start = async () => {
	await dataSource.initialize();

	const countries = await Country.find();
	if (countries.length === 0) {
		const country1 = new Country();
		country1.code = "FR";
		country1.name = "France";
		country1.emoji = "🇫🇷";
		country1.continentCode = "EU";
		country1.save();

		const country2 = new Country();
		country2.code = "BE";
		country2.name = "Belgique";
		country2.emoji = "🇧🇪";
		country2.continentCode = "EU";
		country2.save();

		const country3 = new Country();
		country3.code = "AN";
		country3.name = "Andorre";
		country3.emoji = "🇦🇩";
		country3.continentCode = "EU";
		country3.save();

		const country4 = new Country();
		country4.code = "BS";
		country4.name = "Bahamas";
		country4.emoji = "🇧🇸";
		country4.continentCode = "NA";
		country4.save();
	}

	const schema = await buildSchema({
		resolvers: [CountryResolver],
	});

	const server = new ApolloServer({
		schema,
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});

	console.log(`🚀  Server ready at: ${url}`);
};

start();
