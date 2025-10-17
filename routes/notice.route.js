const express = require("express");
const {
  createNotice,
  getNotice,
  deleteNotice,
  updateNotice,
  getNoticeById,
  getSpecificNotice,
} = require("../controllers/notice.controller");
const router = express.Router();

router.post("/addNotice", createNotice);
router.get("/getNotice", getNotice);
router.get("/getNoticeById/:id", getNoticeById);
router.delete("/deleteNotice/:id", deleteNotice);
router.route("/updateNotice/:id").patch(updateNotice);
router.route("/specific").get(getSpecificNotice);

module.exports = router;
