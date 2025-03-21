import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/UserModel";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login: any = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
