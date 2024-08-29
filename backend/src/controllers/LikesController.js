import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getLikes(req, res) {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    try {
      if (err) throw err;

      const checkUser = await prisma.user.findFirst({
        where: {
          name: user.name,
          id: user.id,
        },
      });

      if (!checkUser) throw "Error, You're not signed!";

      const data = await prisma.likes.findMany({
        where: {
          userId: user.id,
        },
        include: {
          product: true,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  });
}

export async function storeLikes(req, res) {
  const { token } = req.cookies;
  const { productId, userId } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    try {
      if (err) throw err;

      const checkUser = await prisma.user.findFirst({
        where: {
          name: user.name,
          id: user.id,
        },
      });

      if (!checkUser) throw "Error, You're not signed!";

      const checkProduct = await prisma.likes.findFirst({
        where: {
          productId,
          userId,
        },
      });

      if (checkProduct) throw "Error, you've put this item on your wishlist";

      await prisma.likes.create({
        data: {
          productId,
          userId,
        },
      });

      res
        .status(200)
        .json({ success: "product has been store on your wishlist" });
    } catch (error) {
      res.json({ error });
    }
  });
}

export async function deleteLikes(req, res) {
  const { token } = req.cookies;
  const { itemId } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    try {
      if (err) throw err;

      const checkUser = await prisma.user.findFirst({
        where: {
          name: user.name,
          id: user.id,
        },
      });

      if (!checkUser) throw "Error, You're not signed!";

      const data = await prisma.likes.delete({
        where: {
          id: itemId,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  });
}
