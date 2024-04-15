import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import { CountryInput } from "../inputs/Country";

@Resolver()
export class CountryResolver {
	@Query(() => [Country])
	async countries() {
		return await Country.find();
	}

	@Query(() => Country)
	async countryByCode(@Arg("code") code: string) {
		try {
			return await Country.findOne({ where: { code: code } });
		} catch (e) {
			console.log("Error, code not found");
		}
	}

	@Mutation(() => String)
	async deleteCountries() {
		await Country.clear();
		return "all countries are deleted";
	}

	@Mutation(() => String)
	async createCountry(@Arg("data") data: CountryInput) {
		try {
			const country = new Country();
			country.code = data.code;
			country.name = data.name;
			country.emoji = data.emoji;
			await country.save();
			return "Country created !";
		} catch (e) {
			return "Error when creating country : " + e;
		}
	}
}
