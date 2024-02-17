import express from "express";
import { CreateBlogPost, DeleteBlogById, GetAllPublishedBlog, GetDetailBlog, PublishBlog } from "../controller/BlogController";

const BlogRouter = express.Router();

BlogRouter.get("/", GetAllPublishedBlog);
BlogRouter.post("/new", CreateBlogPost);
BlogRouter.patch("/publish", PublishBlog);
BlogRouter.get("/:id", GetDetailBlog);
BlogRouter.delete("/:id", DeleteBlogById);

export default BlogRouter;
