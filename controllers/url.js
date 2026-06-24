const urlmodel = require("../models/urldb");
const shortid = require("shortid");
async function handlegenerateurl(req, res) {
  const sid = shortid();
  let { url } = req.body;
  await urlmodel.create({
    shortid: sid,
    orgurl: url,
    visithistory: [],
    createdBy: req.user.userid,
  });
  res.render("userpage", {
    shortUrl: `${process.env.BASE_URL}/url/${sid}`,
  });
}

async function handleredirect(req, res) {
  const id = req.params.id;
  const user = await urlmodel.findOneAndUpdate(
    { shortid: id },
    { $push: { visithistory: { timestamp: Date.now() } } },
    { new: true },
  );
  if (!user) {
    return res.status(404).send("URL not found");
  }

  // console.log(user);
  return res.redirect(user.orgurl);
}

async function handleanalytics(req, res) {
  // console.log(req.user);

  const urls = await urlmodel.find({
    createdBy: req.user.userid,
  });
  res.render("analytics", { urls });
}

async function handleVisitHistory(req, res) {
  const url = await urlmodel.findOne({
    shortid: req.params.id,
    createdBy: req.user.userid,
  });

  res.render("visithistory", { url });
}

module.exports = {
  handlegenerateurl,
  handleredirect,
  handleanalytics,
  handleVisitHistory,
};
