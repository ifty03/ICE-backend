const Notice = require("../models/notice.model");
const {
  createNoticeService,
  deleteNoticeService,
  updateNoticeService,
  getNoticeByIdService,
} = require("../services/notice.service");
// for property post
exports.createNotice = async (req, res) => {

  try {
    const newNotice = await createNoticeService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newNotice,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Notice
exports.getNotice = async (req, res) => {
  try {
    const page = (parseInt(req.query.page)-1) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const notices = await Notice.find({})
      .skip(page * limit)
      .limit(limit);

    const total = await Notice.countDocuments({});
    res.status(200).json({
      status: "success",
      data: notices,
      total: total,
      page: page,
      limit: limit,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Notice
exports.deleteNotice = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteNoticeService(id);
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update Notice
exports.updateNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await updateNoticeService(id, req.body);

    if (!notice.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Notice updated successfully",
      data: notice,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update notice ",
      error: error.message,
    });
  }
};

exports.getNoticeById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getNoticeByIdService(id);

    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

// get Specific Notice
exports.getSpecificNotice = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let notices = await Notice.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Notice.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: notices,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
