import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

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
  const item = await prisma.item.create({
    data: {
      title: req.body.title,
      price: req.body.price,
    },
  });
  res.json(item);
  // console.log("Request body - ", req.body)
  res.json(req.body);
});

if (import.meta.env.PROD) app.listen(3000);

export const viteExpressApp = app;
