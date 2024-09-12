const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.post("/create", groupController.createGroup);
// Route to get groups by user ID
router.get("/user-groups", groupController.getGroupsByUserId);
//get membercount
router.get("/membercount/:group_id", groupController.getMemberCount);
// Route to get a specific group by its group ID
router.get("/:group_id", groupController.getGroupById);
//fetch members
router.get("/:group_id/members", groupController.getMembersByGroupId);

module.exports = router;
