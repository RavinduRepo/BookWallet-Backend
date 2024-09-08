const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.post("/create", groupController.createGroup);
// Route to get groups by user ID
router.get("/user-groups", groupController.getGroupsByUserId);

//Route to insert member a group
// router.post('/insertmember', groupController.insertMember);
router.get("/membercount/:group_id", groupController.getMemberCount);
// Route to get a specific group by its group ID
router.get("/:group_id", groupController.getGroupById);

module.exports = router;
