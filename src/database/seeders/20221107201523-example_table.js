'use strict';

/** @type {import('sequelize-cli').Migration} */

let fs = require('fs');
const exampleJson = JSON.parse(fs.readFileSync(__dirname + '/example.json', 'utf8'));

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('example_table', exampleJson);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('example_table', null, {});
  }
};
