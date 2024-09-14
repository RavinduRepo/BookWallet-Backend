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
//fetch group req
router.get('/:group_id/requests', groupController.getUserRequestsByGroupId);
// Check if the user is an admin of the group
router.get("/:group_id/check-admin", groupController.checkAdminStatus);
// Route for accepting a user into a group
router.post("/accept-user", groupController.acceptUserRequest);
// Route for removing user request
router.post('/request/remove', groupController.removeUserRequest);
module.exports = router;
