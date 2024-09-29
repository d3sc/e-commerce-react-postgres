import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export async function getHistory(req, res) {
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

      const history = await prisma.history.findMany({
        where: {
          userId: user.id,
        },
        include: {
          product: true,
        },
      });

      res.status(200).json(history);
    } catch (error) {
      res.status(400).json({ error });
    }
  });
}
