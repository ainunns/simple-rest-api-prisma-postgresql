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

app.post("/post", async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    },
  });
  res.json(result);
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

app.put("/post/publish/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      published: true,
    },
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
