'use strict';
module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define('Volunteer', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    occupation: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  Volunteer.associate = function(models) {
    // associations can be defined here
  };
  return Volunteer;
};
