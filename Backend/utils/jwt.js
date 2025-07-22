import jwt from "jsonwebtoken";
export const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
