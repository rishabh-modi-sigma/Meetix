import httpStatus from "http-status";
import User from "../models/user.models.js"; 
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND)
        .json({ message: "User is Not Found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();

      return res.status(httpStatus.OK).json({ token });
    } else {
      return res.status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Username and Password" });
    }

  } catch (e) {
    return res.status(500).json({ message: `Authentication failed: ${e.message}` });
  }
};


const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const exitUser = await User.findOne({ username });

    if (exitUser) {
      return res.status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(httpStatus.CREATED)
      .json({ message: "User Created Successfully" });

  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
      error: e.message
    });
  }
};

export { login, register };
