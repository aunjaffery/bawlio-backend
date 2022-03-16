import express from "express";
import contactsController from "../controllers/contacts.controller";
const router = express.Router();

router.get("/check", (req, res) => {
  res.status(200).json({ msg: "All good" });
});

router.get("/addAdmin", contactsController.createAdmin);
router.get("/contacts", contactsController.getAllContacts);

router.get("/contactsbydevice", contactsController.contactsByDevice);

router.post("/addcontacts", contactsController.addContacts);

router.post("/ioscontacts", contactsController.addIosContacts);

router.post("/storecontacts", contactsController.storeContacts);

router.delete("/deletecontact", contactsController.deleteContact);

router.post("/demo", (req, res) => {
  console.log(req.body.qwe);
  let p = JSON.parse(req.body);
  console.log(p);
  return res.json({ msg: "happy coding" });
});

export default router;
