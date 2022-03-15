import models from "../models";
import utils from "../services/utils";
import log from "../logger/logger";

let methods = {
  createAdmin: async (_, res) => {
    try {
      console.log("create admin");
      const data = {
        fullName: "Super Admin",
        username: "superadmin",
        password: "qwe123",
      };
      data.password = await utils.hashPassword(data.password);
      console.log(data);
      let created = await models.Admin.create(data);
      res
        .status(200)
        .json({ success: true, msg: "admin created", data: created });
    } catch (err) {
      console.log(err);
      res.status(502).json({ success: false, msg: "cannot create admin", err });
    }
  },
  getAllContacts: async (req, res) => {
    log.info("GET ALL CONTACTS");
    try {
      let dbContacts = await models.Contacts.findAll({});
      return res
        .status(200)
        .json({ success: true, msg: "all contacts", data: dbContacts });
    } catch (error) {
      console.log(error);
      res
        .status(502)
        .json({ success: false, msg: "cannot fetch contacts", error });
    }
  },
  addContacts: async (req, res) => {
    console.log("ANDRIOD ADD CONTACTS CALLED");
    try {
      let data = req.body;
      console.log(data);
      if (!Array.isArray(data)) throw "Error! Provided data is not an Array";
      await models.Contacts.bulkCreate(data);
      return res
        .status(200)
        .json({ success: true, msg: "Contacts added successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(502)
        .json({ success: false, msg: "cannot create contacts", error });
    }
  },
  addIosContacts: async (req, res) => {
    console.log("IOS ADD CONTACTS CALLED");
    try {
      let data = req.body;
      console.log(data);
      let p = JSON.parse(data);
      console.log("parsed", p);
      if (!Array.isArray(p)) throw "Error! Provided data is not an Array";
      await models.Contacts.bulkCreate(p);
      return res
        .status(200)
        .json({ success: true, msg: "Contacts added successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(502)
        .json({ success: false, msg: "cannot create contacts", error });
    }
  },
  deleteContact: async (req, res) => {
    try {
      let id = req.query.id;
      if (!id) throw "Error! Please provide {id} in query string";
      let deleted = await models.Contacts.destroy({ where: { id } });
      if (!deleted)
        throw "Error! Cannot deleted contact, either contact doesn't exsist or already deleted";
      console.log(deleted);
      return res
        .status(200)
        .json({ success: true, msg: "Contact deleted successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(502)
        .json({ success: false, msg: "Cannot deleted contact", error });
    }
  },
};

export default methods;
