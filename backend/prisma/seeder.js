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
  const admin = await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@gmail.com",
      password: "adminkece01",
    },
  });

  const cart = await prisma.cart.create({
    data: {
      userId: admin.id,
    },
    include: {
      cart_item: true,
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      price: parseInt(Math.trunc(faker.commerce.price())),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
    },
  });
  const product2 = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      price: parseInt(Math.trunc(faker.commerce.price())),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
    },
  });

  const cart_item1 = await prisma.cart_item.create({
    data: {
      quantity: 3,
      productId: product1.id,
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  });

  const likes = await prisma.likes.create({
    data: {
      productId: product2.id,
      userId: admin.id,
    },
  });

  const cart1 = await prisma.cart.findMany({
    where: {
      id: cart.id,
    },
    include: {
      cart_item: {
        select: {
          quantity: true,
          product: true,
        },
      },
    },
  });

  const user1 = await prisma.user.findUnique({
    where: {
      id: admin.id,
    },
    include: {
      cart: {
        select: {
          cart_item: {
            select: {
              quantity: true,
              product: true,
            },
          },
        },
      },
    },
  });

  const likes1 = await prisma.likes.findMany({
    where: {
      id: likes.id,
    },
    include: {
      product: true,
    },
  });

  return { cart1, user1, cart_item1, likes1 };
};

const { cart1: cart, user1, cart_item1, likes1 } = await createSeeder();

// console.log(cart[0].cart_item[0]);
// console.log(user1.cart.cart_item[0]);
// console.log(cart_item1);
console.log(likes1);
