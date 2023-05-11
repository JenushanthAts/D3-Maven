import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    otp: {
      type: Number,
      default: function () {
        let hash = Math.floor(1000 + Math.random() * 9000);
        return hash;
      },
    },
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "in-active",
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
    userRole: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export default model("User", userSchema);
