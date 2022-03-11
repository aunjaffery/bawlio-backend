import express from "express";
import contactsController from "../controllers/contacts.controller";
const router = express.Router();

router.get("/check", (req, res) => {
  res.status(200).json({ msg: "All good" });
});

router.get("/addAdmin", contactsController.createAdmin);
router.get("/contacts", contactsController.getAllContacts);
router.post("/addcontacts", contactsController.addContacts);
router.delete("/deletecontact", contactsController.deleteContact);

export default router;
