import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUsers(req, res) {
  const user = await prisma.user.findMany();

  res.send(user);
}
