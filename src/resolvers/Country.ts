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
			const country = await Country.findOne({ where: { code: code } });
			if (country) {
				return country;
			} else {
				console.log("Error, code not found");
			}
		} catch (e) {
			console.log("Error when recovery country with specific code");
		}
	}

	@Query(() => [Country])
	async countriesByContinent(@Arg("continentCode") continentCode: string) {
		try {
			const countries = await Country.find({
				where: { continentCode: continentCode },
			});
			if (countries) {
				return countries;
			} else {
				console.log("No country with this cotinent code");
			}
		} catch (e) {
			console.log("Error when recovery countries by continent code");
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
			country.continentCode = data.continentCode;
			await country.save();
			return "Country created !";
		} catch (e) {
			return "Error when creating country : " + e;
		}
	}
}
