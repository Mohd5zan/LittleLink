const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortid: {
      type: String,
      required: true,
    },
    orgurl: {
      type: String,
      required: true,
    },
    visithistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamp: true },
);

const urlmodel = mongoose.model("url", urlSchema);
module.exports = urlmodel;
