import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function clean() {
  await prisma.cart_item.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.likes.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
}
