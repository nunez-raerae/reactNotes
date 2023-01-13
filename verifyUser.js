import jwt from "jsonwebtoken";
import AccessTkn from "./accesstoken.js";
import * as dotenv from 'dotenv'
dotenv.config()
async function VerifyUser({ loginRes }) {
  const find = await AccessTkn.findOne({ userId: loginRes._id });
  if (find) {
    const ver = jwt.verify(find.accessToken, process.env.SECRETE_KEY, (error, decoded) => {
      if (error) {
        return "error";
      }
      return find.accessToken;
    });
    return ver;
  }
  return "error";
}

export default VerifyUser;
