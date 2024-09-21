import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import midtransClient from "midtrans-client";
import "dotenv/config";

export async function processTransaction(req, res) {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    let { cartId, userId } = req.body;

    const orderId = "ORDER-" + new Date().getTime();

    const cartData = await prisma.cart_item.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });

    let item_details = [];
    let total = 0;

    cartData.map((item) => {
      item_details.push({
        id: item.product.id,
        price: item.product.price,
        quantity: item.quantity,
        name: item.product.name,
      });
      total += item.quantity * item.product.price;
    });

    const cartUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const customer_details = {
      first_name: cartUser.name,
      email: cartUser.email,
    };

    const transaction_details = {
      order_id: orderId,
      gross_amount: total,
    };

    const parameter = {
      transaction_details,
      item_details,
      customer_details,
    };

    snap.createTransaction(parameter).then((transaction) => {
      const data = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;

      res.status(200).json({ data, token });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
