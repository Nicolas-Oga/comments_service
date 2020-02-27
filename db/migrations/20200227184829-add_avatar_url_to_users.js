'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'avatarUrl', Sequelize.STRING),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'avatarUrl')
};
