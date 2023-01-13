import jwt from "jsonwebtoken";
import AccessTkn from "./accesstoken.js";

async function Auth({ token, userDetails }) {
  const userToken = new AccessTkn({
    userId: userDetails._id,
    accessToken: token
  });
  const res = await userToken.save().catch((error) => {
    return error;
  });

  return res;
}

export default Auth;
