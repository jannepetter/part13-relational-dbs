const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../utils/db')

class Blog extends Model {}
Blog.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  author:{
    type:DataTypes.TEXT
  },
  url:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  title:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  likes:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  yearwritten:{
    type:DataTypes.INTEGER,
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
  }
},{
  sequelize,
  underscored:true,
  timestamps:true,
  modelName:'blog'
})

module.exports = Blog

