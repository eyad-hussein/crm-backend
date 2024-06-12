const { Op } = require("sequelize");

const logger = require("../utils/Logger");
const { changeToSingular } = require("../utils/Parser.utils");

const userRepository = require("../repositories/User.repository");
const addressRepository = require("../repositories/Address.repository");

const createFilterCriteria = async (filterOptions) => {
  logger.info({
    message: "Creating filter criteria",
    filterOptions,
  });

  const filterCriteria = {
    [Op.or]: [
      filterOptions["name"] && { name: { [Op.substring]: filterOptions.name } },
      filterOptions["follow_up_date"] && {
        follow_up_date: { [Op.substring]: filterOptions.follow_up_date },
      },
      filterOptions["lead_source"] && {
        lead_source: filterOptions.lead_source,
      },
      filterOptions["email"] && {
        email: { [Op.substring]: filterOptions.email },
      },
      filterOptions["priority"] && { priority: filterOptions.priority },
      filterOptions["industry_id"] && {
        industry_id: filterOptions.industry_id,
      },
    ],
  };

  if (filterOptions["country_id"]) {
    const addresses = await addressRepository.getAddressesByFilters({
      country_id: filterOptions.country_id,
    });

    const customerIds = addresses.map((address) => address.customer_id);

    filterCriteria[Op.or].push({
      id: {
        [Op.in]: customerIds,
      },
    });
  }

  if (filterOptions["user"]) {
    const users = await userRepository.getUsersByFilters({
      [Op.or]: [
        { first_name: { [Op.substring]: filterOptions.user } },
        { last_name: { [Op.substring]: filterOptions.user } },
      ],
    });

    const userIds = users.map((user) => user.id);

    filterCriteria[Op.or].push({
      user_id: {
        [Op.in]: userIds,
      },
    });
  }

  if (filterOptions.status) {
    const status = changeToSingular(filterOptions.status);
    filterCriteria.status = status;
  }

  return filterCriteria;
};

module.exports = {
  createFilterCriteria,
};
