import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import dotenv from "dotenv";

dotenv.config();

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // Checking if user exists in database
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    // If user exists in database then check his password and compare it with database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password is incorrect
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    // If password is correct then give the token to the user
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // Checking if user exists in database
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Checking if both password fields are correct
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    //  Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating the user
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Creating the token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
