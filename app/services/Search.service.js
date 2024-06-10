const logger = require("../utils/Logger");
const {
  userRepository,
  customerPhoneNumberRepository,
  countryRepository,
  industryRepository,
  addressRepository,
} = require("../repositories");

const createSearchCriteria = async (searchFilters, query, status) => {
  let searchCriteria = {};
  logger.info("search filters after", { searchFilters });

  searchFilters = searchFilters != "undefined" ? searchFilters.split(",") : [];

  if (!searchFilters.length) {
    searchCriteria = {
      name: { [Op.substring]: query },
    };
  } else {
    searchCriteria = {
      [Op.or]: [
        searchFilters.includes("name") && { name: { [Op.substring]: query } },
        searchFilters.includes("follow_up_date") && {
          follow_up_date: { [Op.substring]: query },
        },
        searchFilters.includes("lead_source") && {
          lead_source: { [Op.substring]: query },
        },
        searchFilters.includes("email") && { email: { [Op.substring]: query } },
      ],
    };

    if (searchFilters.includes("industry")) {
      const industries = await industryRepository.getIndustriesByFilters({
        industry_name: { [Op.substring]: query },
      });

      const industryIds = industries.map((industry) => industry.id);

      searchCriteria[Op.or].push({
        industry_id: {
          [Op.in]: industryIds,
        },
      });
    }

    if (searchFilters.includes("phone_number")) {
      const phoneNumbers =
        await customerPhoneNumberRepository.getCustomerPhoneNumbersByFilters({
          phone_number: { [Op.substring]: query },
        });

      const customerIds = phoneNumbers.map(
        (phoneNumber) => phoneNumber.customer_id
      );

      searchCriteria[Op.or].push({
        id: {
          [Op.in]: customerIds,
        },
      });
    }

    if (searchFilters.includes("country")) {
      const countries = await countryRepository.getCountriesByFilters({
        country_name: { [Op.substring]: query },
      });

      const countriesIds = countries.map((country) => country.id);

      const addresses = await addressRepository.getAddressesByFilters({
        country_id: {
          [Op.in]: countriesIds,
        },
      });

      const customerIds = addresses.map((address) => address.customer_id);

      searchCriteria[Op.or].push({
        id: {
          [Op.in]: customerIds,
        },
      });
    }

    if (searchFilters.includes("user")) {
      const users = await userRepository.getUsersByFilters({
        [Op.or]: [
          { first_name: { [Op.substring]: query } },
          { last_name: { [Op.substring]: query } },
        ],
      });

      const userIds = users.map((user) => user.id);

      searchCriteria[Op.or].push({
        user_id: {
          [Op.in]: userIds,
        },
      });
    }

    logger.info("search criteria", { searchCriteria });
  }

  return searchCriteria;
};
