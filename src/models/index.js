"use strict";
import Sequelize from "sequelize";
import config from "config";
import AdminModel from "./admin";
import ContactModel from "./contacts";
import DeviceModel from "./device";

const env = process.env.NODE_ENV || "development";
let cred = config.get(env);
const db = {};

let sequelize;
sequelize = new Sequelize(cred.database, cred.username, cred.password, cred);

db.Admin = AdminModel(sequelize, Sequelize.DataTypes);
db.Contacts = ContactModel(sequelize, Sequelize.DataTypes);
db.Device = DeviceModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
