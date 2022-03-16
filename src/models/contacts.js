"use strict";
const Contacts = (sequelize, DataTypes) => {
  var Contacts = sequelize.define(
    "Contacts",
    {
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Contacts.associate = function (models) {
    Contacts.belongsTo(models.Device, {
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

  return Contacts;
};
export default Contacts;
