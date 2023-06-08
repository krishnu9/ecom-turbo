import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from express");
});

if (import.meta.env.PROD) app.listen(3000);

export const viteExpressApp = app;
