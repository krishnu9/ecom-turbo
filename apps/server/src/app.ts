import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { createItemInput } from "zodtypes";

const app = express();
dotenv.config();
const prisma = new PrismaClient();

// Middlewares 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/item", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post("/item", async (req, res) => {
  const parsedItem = createItemInput.safeParse(req.body);
  if (!parsedItem.success) {
    return res.status(411).json({
      error: parsedItem.error.message
    })
  }
  const createdItem = await prisma.item.create({
    data: {
      title: parsedItem.data.title,
      price: parsedItem.data.price,
    },
  });
  res.json(createdItem.id);
});

if (import.meta.env.PROD) app.listen(3000);

export const viteExpressApp = app;
