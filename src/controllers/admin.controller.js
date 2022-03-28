import models from "../models";
import utils from "../services/utils";
import log from "../logger/logger";

let methods = {
  createAdmin: async (req, res) => {
    try {
      console.log("create admin");
      const data = {
        fullName: "Super Admin",
        username: "superadmin",
        password: "qwe123",
      };
      data.password = await utils.hashPassword(data.password);
      console.log(data);
      await models.Admin.create(data);
      res.status(200).json({ success: true, msg: "admin created" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, msg: "cannot create admin", err });
    }
  },
  login: async (req, res) => {
    console.log("Admin login Called");
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    try {
      if (!username || !password) throw "Error! Invalid request";
      let admin = await models.Admin.findOne({ where: { username } });
      if (!admin) throw "Error! Invalid credentials";
      let match = await utils.comparePassword(
        password,
        admin.dataValues.password
      );
      if (!match) throw "Error! Invalid credentials";
      let access_token = await utils.issueToken({ id: admin.dataValues.id });
      let result = {
        user: {
          id: admin.dataValues.id,
          role: admin.dataValues.role,
          fullName: admin.dataValues.fullName,
          username: admin.dataValues.username,
          photoURL: admin.dataValues.image,
        },
        access_token,
      };
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log(error);
      res
        .status(501)
        .json({ success: false, msg: "Error! Invalid request", error });
    }
  },
  validation: async (req, res) => {
    console.log("Admin Validate called");
    try {
      console.log(req.token);
      const { id } = req.token;
      let admin = await models.Admin.findByPk(id);
      if (!admin) throw "Error! Invalid token";
      let access_token = await utils.issueToken({
        id: admin.dataValues.id,
      });
      let result = {
        user: {
          id: admin.dataValues.id,
          role: admin.dataValues.role,
          fullName: admin.dataValues.fullName,
          username: admin.dataValues.username,
          photoURL: admin.dataValues.image,
        },
        access_token,
      };
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, msg: "Invalid Token", error });
    }
  },
  getadmins: (req, res) => {
    models.Admin.findAll({})
      .then((result) => {
        res.status(200).json({ success: true, result });
      })
      .catch((error) => {
        res.status(501).json({ success: false, error });
      });
  },
  addAdmin: async (req, res) => {
    let admin = req.body;
    admin.password = await utils.hashPassword(admin.password);
    console.log(admin);
    models.Admin.create(admin)
      .then(() => res.status(200).json({ success: true, msg: "admin created" }))
      .catch((err) => {
        if (err instanceof models.Sequelize.UniqueConstraintError) {
          return res
            .status(502)
            .json({ success: false, msg: "Username already exsist" });
        }
        console.log(err);
      });
  },
};
export default methods;
