import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import crypto from "crypto";
// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logFilePath = join(__dirname, "../logs/customerLogs.txt");

const fetchAllCustomer = async (req, res) => {
  try {
    const customer = await User.find(
      { userRole: "customer" },
      { email: 1, mobileNo: 1, fullName: 1, status: 1 }
    ).sort({ _id: -1 });
    return res.status(200).json(customer);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updateCustomerStatus = async (req, res) => {
  try {
    await User.findById(req.params.customerId).updateOne({
      status: req.body.status,
    });
    return res
      .status(200)
      .json({ message: "User status successfully updated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;
    if (!email || !otp || !newPassword || !confirmPassword)
      return res.status(400).json({ error: "All fields are mandotory" });
    //password confirmation
    if (newPassword !== confirmPassword)
      return res.status(400).json({ error: "Password does not match" });
    const verifyOTP = await User.findOne({
      email: email,
      otp: otp,
    });
    if (!verifyOTP) {
      //write log file
      const logEntry = `${crypto.randomUUID()} ${new Date().toISOString()} - ${email} - Message : OTP does not match \n`;
      fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
          console.log(err);
        }
      });
      return res.status(400).json({ error: "OTP does not match" });
    }
    const user = await User.findById(req.params.customerId);
    //check user is exists or not
    if (!user) return res.status(404).json({ error: "User not found" });
    //hash method
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const logEntry = `${crypto.randomUUID()} ${new Date().toISOString()} - ${email} - Message : Password Updated\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await User.findByIdAndUpdate(req.params.customerId, {
      password: hashedPassword,
      firstLogin: false,
    });
    return res
      .status(200)
      .json({ message: "User password successfully updated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export { fetchAllCustomer, updateCustomerStatus, updatePassword };
