import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getLikes(req, res) {
  const { token } = req.cookies;

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const checkUser = await prisma.user.findFirst({
        where: {
          name: user.name,
          id: user.id,
        },
      });

      if (!checkUser) throw new Error("Error, You're not signed!");

      const data = await prisma.likes.findMany({
        where: {
          userId: user.id,
        },
        include: {
          product: true,
        },
      });

      res.status(200).json(data);
    });
  } catch (error) {
    res.status(400).json({ "ada error": error });
  }
}

export async function deleteLikes(req, res) {
  const { token } = req.cookies;
  const { itemId } = req.body;

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const checkUser = await prisma.user.findFirst({
        where: {
          name: user.name,
          id: user.id,
        },
      });

      if (!checkUser) throw new Error("Error, You're not signed!");

      const data = await prisma.likes.delete({
        where: {
          id: itemId,
        },
      });

      res.status(200).json(data);
    });
  } catch (error) {
    res.status(400).json({ "ada error": error });
  }
}
