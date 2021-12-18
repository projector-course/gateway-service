const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }

  Services.init({
    name: {
      type: DataTypes.STRING,
    },
    prefix: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'services',
  });

  return Services;
};
