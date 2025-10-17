const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema(
  {
        title: { type: String },
        image: { type: String },
        category: { type: String },
        department: { type: String },
        status: { type: String },
        description: { type: String },
        button1Label: { type: String },
        button1Link: { type: String },
        button2Label: { type: String },
        button2Link: { type: String },
  },
  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
