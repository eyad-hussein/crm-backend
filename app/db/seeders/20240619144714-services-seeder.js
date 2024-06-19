"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "services",
      [
        {
          id: 1,
          service_name: "Digital Marketing",
          service_cost: 1000,
          description: "Digital Marketing service",
        },
        {
          id: 2,
          service_name: "Technology and Automation",
          service_cost: 2000,
          description: "Technology and Automation service",
        },
        {
          id: 3,
          service_name: "SMS Marketing",
          service_cost: 3000,
          description: "SMS Marketing service",
        },
        {
          id: 4,
          service_name: "Alpha Print",
          service_cost: 4000,
          description: "Alpha Print service",
        },
        {
          id: 5,
          service_name: "Cloud Backup as a Service",
          service_cost: 5000,
          description: "Cloud Backup as a Service service",
        },
        {
          id: 6,
          service_name: "Alpha Influencers",
          service_cost: 6000,
          description: "Alpha Influencers service",
        },
        {
          id: 7,
          service_name: "Alpha Podcast Room",
          service_cost: 7000,
          description: "Alpha Podcast Room service",
        },
        {
          id: 8,
          service_name: "Alpha Academy",
          service_cost: 8000,
          description: "Alpha Academy service",
        },
        {
          id: 9,
          service_name: "Other",
          description: "Other service",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("services", null, {});
  },
};
