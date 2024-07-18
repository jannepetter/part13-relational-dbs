const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.addColumn('blogs', 'yearwritten', {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min: {
                args: 1991,
                msg: "Year has to be at least 1991 or greater"
            },
            max: {
                args: new Date().getFullYear(),
                msg: `The year cannot be past current year (${new Date().getFullYear()})`
            }
        }
      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.removeColumn('blogs','yearwritten')
    },
  }