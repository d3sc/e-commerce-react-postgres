import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import clean from "./helpers/clean.js";

const prisma = new PrismaClient();

const createSeeder = async () => {
  await clean();
  const user = await prisma.user.create({
    data: {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });

  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
    include: {
      product: true,
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      price: parseInt(Math.trunc(faker.commerce.price())),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
      cartId: cart.id,
    },
  });
  const product2 = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      price: parseInt(Math.trunc(faker.commerce.price())),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
      cartId: cart.id,
    },
  });

  const cart1 = await prisma.cart.findMany({
    where: {
      id: cart.id,
    },
    include: {
      product: true,
    },
  });

  const user1 = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      cart: {
        select: {
          product: true,
        },
      },
    },
  });

  return { cart1, user1 };
};

// const { cart1: cart, user1 } = await createSeeder();
