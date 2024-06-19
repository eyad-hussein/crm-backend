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
      "industries",
      [
        {
          id: 1,
          industry_name: "Agriculture",
          description: "Agriculture industry",
        },
        {
          id: 2,
          industry_name: "Automotive",
          description: "Automotive industry",
        },
        {
          id: 3,
          industry_name: "Construction",
          description: "Construction industry",
        },
        {
          id: 4,
          industry_name: "Education",
          description: "Education industry",
        },
        {
          id: 5,
          industry_name: "Finance",
          description: "Finance industry",
        },
        {
          id: 6,
          industry_name: "Healthcare",
          description: "Healthcare industry",
        },
        {
          id: 7,
          industry_name: "Hospitality",
          description: "Hospitality industry",
        },
        {
          id: 8,
          industry_name: "IT",
          description: "IT industry",
        },
        {
          id: 9,
          industry_name: "Manufacturing",
          description: "Manufacturing industry",
        },
        {
          id: 10,
          industry_name: "Media",
          description: "Media industry",
        },
        {
          id: 11,
          industry_name: "Real Estate",
          description: "Real Estate industry",
        },
        {
          id: 12,
          industry_name: "Retail",
          description: "Retail industry",
        },
        {
          id: 13,
          industry_name: "Telecommunications",
          description: "Telecommunications industry",
        },
        {
          id: 14,
          industry_name: "Transportation",
          description: "Transportation industry",
        },
        {
          id: 15,
          industry_name: "Utilities",
          description: "Utilities industry",
        },
        {
          id: 16,
          industry_name: "Other",
          description: "Other industry",
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
  },
};
