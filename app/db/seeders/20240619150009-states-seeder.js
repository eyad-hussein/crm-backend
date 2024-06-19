"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const states = [
      // Nigeria
      {
        state_name: "Lagos",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Kano",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Kaduna",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Rivers",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Oyo",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Enugu",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Kwara",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Bauchi",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Benue",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Borno",
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Ghana
      {
        state_name: "Greater Accra",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Ashanti",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Western",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Eastern",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Central",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Northern",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Volta",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Upper East",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Upper West",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Bono",
        country_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Kenya
      {
        state_name: "Nairobi",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Mombasa",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Kisumu",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Nakuru",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Eldoret",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Thika",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Kitale",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Malindi",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Garissa",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Kakamega",
        country_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // South Africa
      {
        state_name: "Gauteng",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Western Cape",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Eastern Cape",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "KwaZulu-Natal",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Mpumalanga",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Limpopo",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "North West",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Free State",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Northern Cape",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Gauteng",
        country_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // United States
      {
        state_name: "California",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Texas",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Florida",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "New York",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Pennsylvania",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Illinois",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Ohio",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Georgia",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "North Carolina",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Michigan",
        country_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // United Kingdom
      {
        state_name: "England",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Scotland",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Wales",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Northern Ireland",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "West Midlands",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Greater London",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Greater Manchester",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "West Yorkshire",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Kent",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Essex",
        country_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Canada
      {
        state_name: "Ontario",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Quebec",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "British Columbia",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Alberta",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Manitoba",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Saskatchewan",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Nova Scotia",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "New Brunswick",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Newfoundland and Labrador",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Prince Edward Island",
        country_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Australia
      {
        state_name: "New South Wales",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Victoria",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Queensland",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Western Australia",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "South Australia",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Tasmania",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Northern Territory",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Australian Capital Territory",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Jervis Bay Territory",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Norfolk Island",
        country_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Germany
      {
        state_name: "Bavaria",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "North Rhine-Westphalia",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Baden-Württemberg",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Lower Saxony",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Hesse",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Saxony",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Rhineland-Palatinate",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Berlin",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Schleswig-Holstein",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Brandenburg",
        country_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // France
      {
        state_name: "Île-de-France",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Provence-Alpes-Côte d'Azur",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Auvergne-Rhône-Alpes",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Nouvelle-Aquitaine",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Occitanie",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Hauts-de-France",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Brittany",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Grand Est",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Pays de la Loire",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        state_name: "Normandy",
        country_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("states", states, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("states", null, {});
  },
};
