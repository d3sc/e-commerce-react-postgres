import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function clean() {
  await prisma.product.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.user.deleteMany();
}
