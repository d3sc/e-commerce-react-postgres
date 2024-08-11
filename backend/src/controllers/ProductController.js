import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getProducts(req, res) {
  const product = await prisma.product.findMany();

  res.send(product);
}

export async function showProducts(req, res) {
  const { id } = req.query;
  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  res.send(product);
}

export async function storeProduct(req, res) {
  const { name, price, description, image } = req.body;
  await prisma.product.create({
    data: {
      name,
      price,
      description,
      image,
    },
  });

  res.status(201).send("create product Success");
}

export async function updateProduct(req, res) {
  const { id } = req.query;
  const { name, price, description, image } = req.body;

  await prisma.product.update({
    data: {
      name,
      price,
      description,
      image,
    },
    where: {
      id: parseInt(id),
    },
  });

  res.status(201).send("product has been updated!");
}

export async function deleteProduct(req, res) {
  const { id } = req.query;

  await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(200).send("product has been deleted!");
}
