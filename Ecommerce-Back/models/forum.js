'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  forum.init({
    name: DataTypes.STRING,
    request: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'forum',
  });
  return forum;
};