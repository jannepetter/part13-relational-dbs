const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../utils/db')

class Session extends Model {}
Session.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  token:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique:true,
    references: { model: 'users', key: 'id' },
  },
},{
  sequelize,
  underscored:true,
  timestamps:false,
  modelName:'session'
})

module.exports = Session

