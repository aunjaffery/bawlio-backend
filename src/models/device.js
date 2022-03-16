"use strict";

const Device = function (sequelize, DataTypes) {
  let Device = sequelize.define(
    "Device",
    {
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Device.associate = function (models) {
    Device.hasMany(models.Contacts, {
      as: "devicecontacts",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: "device_id",
        allowNull: false,
        field: "device_id",
      },
    });
  };

  return Device;
};
export default Device;
