import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      throw new Error("Input field is required!");

    const existEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existEmail) throw new Error("Email is already taken!");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email: email } });

    if (!user) throw new Error("Login Error, code unf01");

    const matchPassword = user.password == password;

    if (!matchPassword) throw new Error("Login Error, code pw01");

    jwt.sign(
      { id: user.id, email, name: user.name },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export async function logout(req, res) {
  const { token } = req.cookies;

  if (token) {
    res.clearCookie("token");
    res.json("Logout Success");
  } else {
    res.json("Error, You're not signed!");
  }
}

export async function getProfile(req, res) {
  // check cookie token
  const { token } = req.cookies;

  // verify token
  if (token)
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;

      res.json(user);
    });
  else res.json("Error, You're not signed!");
}
