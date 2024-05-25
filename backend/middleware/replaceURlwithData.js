const fs = require("fs");
const ReplaceUrlwithData = async (url) => {
  let photo = fs.readFileSync(url);
  let photo64 = Buffer.from(photo).toString("base64");
  return photo64;
};
module.exports = { ReplaceUrlwithData };
