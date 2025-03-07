import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { UnauthenticateError } from "../errors/index.js";

const authentication = async (req, res, next) => {
  try {
    // check header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnauthenticateError("Authentication invalid");
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findById(payload.id).select("-password");

    if (!user) {
      throw new UnauthenticateError("User does not exist");
    }

    // attach the user to the job routes
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };

    next();
  } catch (error) {
    throw new UnauthenticateError("Not authorized to access this route");
  }
};

export default authentication;
