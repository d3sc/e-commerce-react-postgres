import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import path from "path";
import fs from "fs";

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

        res.status(201).json({ success: "Product has been stored!" });
      } catch (err) {
        console.log(err);
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.query;
    const { name, price, description } = req.body;
    if (!name || !price || !description) throw "Error, Input must fill";

    const defaultImage = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        image: true,
      },
    });

    if (req.files === null) {
      try {
        const url = defaultImage.image;
        await prisma.product.update({
          data: {
            name,
            price: parseInt(price),
            description,
            image: url,
          },
          where: {
            id: parseInt(id),
          },
        });

        res.status(201).json({ success: "Product has been Updated!" });
      } catch (err) {
        console.log(err);
      }
    } else {
      const beforeFileName = path.basename(defaultImage.image);
      const filepath = `public/images/${beforeFileName}`;
      fs.unlinkSync(filepath);

      const file = req.files.image;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        throw "Error, file isn't image";

      if (fileSize > 5000000) throw "Error, Image must be less than 5 MB";

      file.mv(`./public/images/${fileName}`, async (error) => {
        try {
          if (error) throw error;

          await prisma.product.update({
            data: {
              name,
              price: parseInt(price),
              description,
              image: url,
            },
            where: {
              id: parseInt(id),
            },
          });

          res.status(201).json({ success: "Product has been Updated!" });
        } catch (error) {
          res.status(400).json({ error });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.query;
  const parsedId = parseInt(id);

  const product = await prisma.product.findFirst({
    where: {
      id: parsedId,
    },
  });

  if (product) {
    const productImageUrl = new URL(product.image);
    const productImageHost = productImageUrl.host;

    if (productImageHost === req.get("host")) {
      const fileName = path.basename(product.image);
      const filepath = `public/images/${fileName}`;
      fs.unlinkSync(filepath);
    }

    await prisma.product.delete({
      where: {
        id: parsedId,
      },
    });

    res.status(200).send("Product has been deleted!");
  } else {
    res.status(404).send("Product not found");
  }
}
