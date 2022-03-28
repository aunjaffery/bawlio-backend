import models from "../models";
import log from "../logger/logger";

let methods = {
  getAllContacts: async (req, res) => {
    log.info("GET ALL CONTACTS");
    try {
      let dbContacts = await models.Contacts.findAll({
        order: [["id", "desc"]],
      });
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
  contactsByDevice: async (req, res) => {
    console.log("CONTACTS BY Device CALLED");
    try {
      let label = req.query.device;
      if (!label) throw "Error! label in query string required";
      let device_id = await models.Device.findOne({ where: { label } });
      if (!device_id) throw "Error! This email does not exsist";
      console.log(device_id.dataValues.id);
      let contacts = await models.Contacts.findAll({
        where: { device_id: device_id.dataValues?.id },
      });
      return res
        .status(200)
        .json({ success: true, msg: "all contacts", data: contacts });
    } catch (error) {
      console.log(error);
      res
        .status(502)
        .json({ success: false, msg: "cannot fetch contacts", error });
    }
  },
  storeContacts: async (req, res) => {
    console.log("STORE CONTACTS");
    try {
      console.log(req.body);
      let device = req.body?.device;
      let contacts = req.body?.contacts;
      if (!device) throw "Error! please user provide email";
      if (!contacts) throw "Error! please provide contacts";
      if (!Array.isArray(contacts))
        throw "Error! Provided contacts is not an Array";
      let device_id = await models.Device.create({
        label: device,
      });
      let newContacts = contacts.map((c) => {
        return {
          ...c,
          device_id: device_id?.dataValues?.id,
        };
      });
      let dbContacts = await models.Contacts.bulkCreate(newContacts);
      console.log(dbContacts);
      return res.status(200).json({ success: true, msg: "all contacts" });
    } catch (error) {
      console.log(error);
      res
        .status(502)
        .json({ success: false, msg: "cannot store contacts", error });
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
      if (!data.device || !Array.isArray(data.firstName))
        throw "Error! Invalid data";
      let device_id = await models.Device.create({
        label: data.device,
      });
      let ary = [];
      for (let i = 0; i < data.firstName.length; i++) {
        let obj = {
          firstName: data.firstName[i] ? data.firstName[i] : null,
          lastName: data.lastName[i] ? data.lastName[i] : null,
          email: data.email[i] ? data.email[i] : null,
          phone: data.phone[i] ? data.phone[i] : null,
          device_id: device_id?.dataValues?.id,
        };
        ary.push(obj);
      }
      console.log(ary);
      await models.Contacts.bulkCreate(ary);
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
