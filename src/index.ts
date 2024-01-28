import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/user", async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.get("/feed", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
  });
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
