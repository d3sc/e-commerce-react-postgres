import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import path from "path";

export async function getProducts(req, res) {
  const product = await prisma.product.findMany();

  res.send(product);
}

export async function showProduct(req, res) {
  const { id } = req.query;
  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  res.send(product);
}

export async function storeProduct(req, res) {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) throw "Error, Input must fill";

    if (req.files === null) throw "Error, No File Uploaded";
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      throw "Error, file isn't image";

    if (fileSize > 5000000) throw "Error, Image must be less than 5 MB";

    file.mv(`./public/images/${fileName}`, async (err) => {
      try {
        if (err) throw err;

        await prisma.product.create({
          data: {
            name,
            price: parseInt(price),
            description,
            image: url,
          },
        });

        res.status(201).json("Product has been stored!");
      } catch (err) {
        console.log(err);
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
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
