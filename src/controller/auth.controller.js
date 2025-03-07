import User from "../model/user.model.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticateError } from "../errors/index.js";

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
    msg: "User Created Sucessfully",
  });
};

const login = async (req, res) => {
  // destructure the email and password variables
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    throw new BadRequestError("Email and password are required.");
  }

  // find email
  const user = await User.findOne({ email });

  // validation user
  if (!user) {
    throw new UnauthenticateError("Invalid Credentials");
  }

  // password
  const isPassword = await user.comparePassword(password);

  // validation password
  if (!isPassword) {
    throw new UnauthenticateError("Invalid Credentials");
  }

  // generate token and user response
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
    msg: "User Login Sucessfully",
  });
};

export { register, login };
