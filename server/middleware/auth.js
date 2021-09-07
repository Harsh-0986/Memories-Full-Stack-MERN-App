import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    console.log(req.header);

    // Getting token from frontend
    const token = req.headers.authorization.split(" ")[1];

    // Checking if the token is from Google
    const isCustomAuth = token.length < 500;

    let decodedData;

    // Verifying the token if the token is custom
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);

      // Getting user's id from our token
      req.userId = decodedData?.id;
    } else {
      // Decoding if the token is from Google
      decodedData = jwt.decode(token);

      // Getting user's id from Google's token
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
