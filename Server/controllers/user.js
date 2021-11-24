import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmedpass } = req.body;

  console.log("email dteb ", email);

  const existingUser = await User.findOne({ email });
  console.log("existing dteb ", existingUser);



  if (existingUser)
    return res.status(404).json({ message: " user already exist " });

  if (password !== confirmedpass) return res.send("invalid");

  const hashedPassword = await bcrypt.hash(password, 12);

  console.log(hashedPassword);

  const result = await User.create({
    email: email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
  });

  console.log(result);

  const token = jwt.sign({ email: result.email, id: result._id }, "test", {
    expiresIn: "1h",
  });

  console.log(token);

  res.status(200).json({ result, token });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser)
    return res.status(404).json({ message: " User doesn't exist " });

  const comparePassword = await bcrypt.compare(password, existingUser.password);

  console.log("compare", comparePassword);

  if (!comparePassword) res.send("invalid");

  const token = jwt.sign(
    { email: existingUser.email, id: existingUser._id },
    "test",
    { expiresIn: "1h" }
  );

  res.status(200).json({ result: existingUser, token });
  console.log("token", token);
};
