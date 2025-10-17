const Notice = require("../models/notice.model");

exports.createNoticeService = async (data) => {
  const notice = await Notice.create(data);
  return notice;
};
exports.deleteNoticeService = async (id) => {
  const notice = await Notice.deleteOne({ _id: id });
  return notice;
};

exports.updateNoticeService = async (id, data) => {
  const notice = await Notice.updateOne({ _id: id }, data);
  return notice;
};
exports.getNoticeByIdService = async (id) => {
  const notice = await Notice.findOne({ _id: id });
  return notice;
};
