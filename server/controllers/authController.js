import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const registerUser = async (req, res, next) => {
  const { fullName, email, password, userRole, mobileNo } = req.body;

  //validation
  if (!fullName || !email || !password || !userRole) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }
  //if user already exists
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  //hash password
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const firstLogin = userRole === "admin" ? false : true;
    await User.create({
      fullName,
      email,
      mobileNo,
      password: hashedPassword,
      firstLogin,
      userRole,
    });
    return res
      .status(201)
      .json({ success: true, message: "Customer created successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //check user is exists or not
    if (!user) return res.status(404).json({ error: "User not found" });
    //decrypt password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Wrong password or username" });

    await User.findOne({ email: req.body.email }).updateOne({
      status: "active",
    });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.userRole },
      process.env.JWT_KEY,
      {
        expiresIn: "8h",
      }
    );
    const { password, ...otherDetails } = user._doc;
    return res.status(200).json({ data: { ...otherDetails, token: token } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export { registerUser, login };
