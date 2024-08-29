import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCart(req, res) {
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

      const data = await prisma.cart.findMany({
        where: {
          userId: user.id,
        },
        include: {
          cart_item: {
            select: {
              id: true,
              quantity: true,
              product: true,
            },
          },
        },
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  });
}

export async function getUserCart(req, res) {
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

      const data = await prisma.cart.findFirst({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  });
}

export async function storeCart(req, res) {
  const { token } = req.cookies;
  const { quantity, productId, cartId } = req.body;

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

      const checkProduct = await prisma.cart_item.findFirst({
        where: {
          productId,
          cartId,
        },
      });

      if (checkProduct) throw "Error, you've put this item on your cart";

      await prisma.cart_item.create({
        data: {
          quantity,
          productId,
          cartId,
        },
      });

      res.status(200).json({ success: "product has been store on your cart" });
    } catch (error) {
      res.json({ error });
    }
  });
}

export async function changeQty(req, res) {
  const { token } = req.cookies;
  const { itemId, qty } = req.body;

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

      const data = await prisma.cart_item.update({
        where: {
          id: itemId,
        },
        data: {
          quantity: qty,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  });
}

export async function deleteCartItem(req, res) {
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

      const data = await prisma.cart_item.delete({
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
