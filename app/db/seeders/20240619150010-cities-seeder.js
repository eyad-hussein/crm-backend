"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Define cities data for each state
    const citiesData = [
      { state_id: 1, cities: ["Ikeja", "Victoria Island"] },
      { state_id: 2, cities: ["Kano Municipal", "Nasarawa"] },
      { state_id: 3, cities: ["Kaduna North", "Kaduna South"] },
      { state_id: 4, cities: ["Port Harcourt", "Obio-Akpor"] },
      { state_id: 5, cities: ["Ibadan", "Ogbomosho"] },
      { state_id: 6, cities: ["Enugu North", "Enugu South"] },
      { state_id: 7, cities: ["Ilorin", "Offa"] },
      { state_id: 8, cities: ["Bauchi", "Azare"] },
      { state_id: 9, cities: ["Makurdi", "Gboko"] },
      { state_id: 10, cities: ["Maiduguri", "Jere"] },
      { state_id: 11, cities: ["Accra", "Tema"] },
      { state_id: 12, cities: ["Kumasi", "Obuasi"] },
      { state_id: 13, cities: ["Sekondi-Takoradi", "Tarkwa"] },
      { state_id: 14, cities: ["Koforidua", "Suhum"] },
      { state_id: 15, cities: ["Cape Coast", "Kasoa"] },
      { state_id: 16, cities: ["Tamale", "Yendi"] },
      { state_id: 17, cities: ["Ho", "Keta"] },
      { state_id: 18, cities: ["Bolgatanga", "Bawku"] },
      { state_id: 19, cities: ["Wa", "Lawra"] },
      { state_id: 20, cities: ["Westlands", "Kasarani"] },
      { state_id: 21, cities: ["Mvita", "Nyali"] },
      { state_id: 22, cities: ["Kisumu Central", "Kisumu East"] },
      { state_id: 23, cities: ["Nakuru Town East", "Nakuru Town West"] },
      { state_id: 24, cities: ["Kapseret", "Moiben"] },
      { state_id: 25, cities: ["Gatanga", "Juja"] },
      { state_id: 26, cities: ["Trans Nzoia East", "Trans Nzoia West"] },
      { state_id: 27, cities: ["Malindi Town", "Kilifi"] },
      { state_id: 28, cities: ["Garissa Township", "Ijara"] },
      { state_id: 29, cities: ["Kakamega North", "Kakamega South"] },
      { state_id: 30, cities: ["Johannesburg", "Pretoria"] },
      { state_id: 31, cities: ["Cape Town", "Stellenbosch"] },
      { state_id: 32, cities: ["Port Elizabeth", "East London"] },
      { state_id: 33, cities: ["Durban", "Pietermaritzburg"] },
      { state_id: 34, cities: ["Nelspruit", "Witbank"] },
      { state_id: 35, cities: ["Polokwane", "Thohoyandou"] },
      { state_id: 36, cities: ["Mahikeng", "Rustenburg"] },
      { state_id: 37, cities: ["Bloemfontein", "Welkom"] },
      { state_id: 38, cities: ["Kimberley", "Upington"] },
      { state_id: 39, cities: ["Los Angeles", "San Francisco"] },
      { state_id: 40, cities: ["Houston", "Dallas"] },
      { state_id: 41, cities: ["Miami", "Orlando"] },
      { state_id: 42, cities: ["New York City", "Buffalo"] },
      { state_id: 43, cities: ["Philadelphia", "Pittsburgh"] },
      { state_id: 44, cities: ["Chicago", "Springfield"] },
      { state_id: 45, cities: ["Columbus", "Cleveland"] },
      { state_id: 46, cities: ["Atlanta", "Savannah"] },
      { state_id: 47, cities: ["Charlotte", "Raleigh"] },
      { state_id: 48, cities: ["Detroit", "Grand Rapids"] },
      { state_id: 49, cities: ["London", "Manchester"] },
      { state_id: 50, cities: ["Glasgow", "Edinburgh"] },
      { state_id: 51, cities: ["Cardiff", "Swansea"] },
      { state_id: 52, cities: ["Belfast", "Derry"] },
      { state_id: 53, cities: ["Birmingham", "Coventry"] },
      { state_id: 54, cities: ["London", "Croydon"] },
      { state_id: 55, cities: ["Manchester", "Salford"] },
      { state_id: 56, cities: ["Leeds", "Bradford"] },
      { state_id: 57, cities: ["Maidstone", "Canterbury"] },
      { state_id: 58, cities: ["Chelmsford", "Colchester"] },
      { state_id: 59, cities: ["Toronto", "Ottawa"] },
      { state_id: 60, cities: ["Montreal", "Quebec City"] },
      { state_id: 61, cities: ["Vancouver", "Victoria"] },
      { state_id: 62, cities: ["Calgary", "Edmonton"] },
      { state_id: 63, cities: ["Winnipeg", "Brandon"] },
      { state_id: 64, cities: ["Regina", "Saskatoon"] },
      { state_id: 65, cities: ["Halifax", "Dartmouth"] },
      { state_id: 66, cities: ["Saint John", "Moncton"] },
      { state_id: 67, cities: ["St. John's", "Mount Pearl"] },
      { state_id: 68, cities: ["Charlottetown", "Summerside"] },
      { state_id: 69, cities: ["Sydney", "Newcastle"] },
      { state_id: 70, cities: ["Melbourne", "Geelong"] },
      { state_id: 71, cities: ["Brisbane", "Gold Coast"] },
      { state_id: 72, cities: ["Perth", "Fremantle"] },
      { state_id: 73, cities: ["Adelaide", "Mount Gambier"] },
      { state_id: 74, cities: ["Hobart", "Launceston"] },
      { state_id: 75, cities: ["Darwin", "Alice Springs"] },
      { state_id: 76, cities: ["Canberra", "Queanbeyan"] },
      { state_id: 77, cities: ["Jervis Bay Village", "Wreck Bay Village"] },
      { state_id: 78, cities: ["Kingston", "Burnt Pine"] },
      { state_id: 79, cities: ["Munich", "Nuremberg"] },
      { state_id: 80, cities: ["Cologne", "Düsseldorf"] },
      { state_id: 81, cities: ["Stuttgart", "Karlsruhe"] },
      { state_id: 82, cities: ["Hanover", "Braunschweig"] },
      { state_id: 83, cities: ["Frankfurt", "Wiesbaden"] },
      { state_id: 84, cities: ["Dresden", "Leipzig"] },
      { state_id: 85, cities: ["Mainz", "Ludwigshafen"] },
      { state_id: 86, cities: ["Berlin"] },
      { state_id: 87, cities: ["Kiel", "Lübeck"] },
      { state_id: 88, cities: ["Potsdam", "Cottbus"] },
      { state_id: 89, cities: ["Paris", "Versailles"] },
      { state_id: 90, cities: ["Marseille", "Nice"] },
      { state_id: 91, cities: ["Lyon", "Grenoble"] },
      { state_id: 92, cities: ["Bordeaux", "Limoges"] },
      { state_id: 93, cities: ["Toulouse", "Montpellier"] },
      { state_id: 94, cities: ["Lille", "Amiens"] },
      { state_id: 95, cities: ["Strasbourg", "Reims"] },
      { state_id: 96, cities: ["Nantes", "Angers"] },
      { state_id: 97, cities: ["Rennes", "Brest"] },
      { state_id: 98, cities: ["Rouen", "Caen"] },
      { state_id: 99, cities: ["Tours", "Orléans"] },
      { state_id: 100, cities: ["Ajaccio", "Bastia"] },
    ];

    // Create an array to hold all cities data
    let cities = [];

    // Iterate through each state's data
    citiesData.forEach((stateData) => {
      const state_id = stateData.state_id;
      const stateCities = stateData.cities.map((cityName) => ({
        city_name: cityName,
        state_id: state_id,
        created_at: new Date(),
        updated_at: new Date(),
      }));

      cities = cities.concat(stateCities);
    });

    // Bulk insert all cities into the database
    await queryInterface.bulkInsert("cities", cities, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all cities from the database
    await queryInterface.bulkDelete("cities", null, {});
  },
};
