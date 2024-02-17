import express, { Express, Request, Response } from "express";
import env from "./config/LoadEnv";
import cors from "cors";
import AuthRouter from "./router/AuthRouter";
import BlogRouter from "./router/BlogRouter";

const app: Express = express();
const port = env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (_: Request, res: Response) => {
  res.send("Simple Blog API");
});

app.use("/api/auth", AuthRouter);
app.use("/api/blog", BlogRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
