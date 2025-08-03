import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: { type: String, required: true },
  username: { type: String }, // make optional
  email: { type: String, required: true },
  image: { type: String }, // make optional
  role: { type: String, enum: ["user", "hotelOwner"], default: "user" },
  recentSearchCities: [{ type: String }], // make optional
}, { timestamps: true });

const User = mongoose.model("users", userSchema);

export default User;
