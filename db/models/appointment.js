'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    appointmentDate: DataTypes.DATE,
    service: DataTypes.STRING,
    size: DataTypes.INTEGER,
    noOfAttachments: DataTypes.INTEGER,
    hairdoHours: DataTypes.INTEGER
  }, {});
  Appointment.associate = function(models) {
    // associations can be defined here
  };
  return Appointment;
};
