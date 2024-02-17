import { StatusCodes } from "http-status-codes";
import { BlogPostRequest } from "../model/BlogModel";
import { CreateBlogPost, DeleteBlogById, PublishBlogById, QueryAllPublishedBlog, QueryBlogById } from "../repository/BlogRepository";
import { CustomError } from "../utils/ErrorHandling";
import { QueryUserByEmail } from "../repository/AuthRepository";

export const CreateBlog = async (body: BlogPostRequest) => {
  const author = await QueryUserByEmail(body.authorEmail);

  if (!author) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Author email cannot be found",
    );
  }

  const blog = await CreateBlogPost(body.title, author.id, body.content);

  if (!blog) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Data");
  }

  return blog;
};

export const PublishBlog = async (blogId: number) => {
  const blog = await QueryBlogById(blogId);
  console.log(blog);
  
  if (!blog) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Blog Id can't be found");
  }

  if (blog.published) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Blog already published");
  }

  const publishedBlog = await PublishBlogById(blogId);

  return publishedBlog;
}

export const GetDetailBlog = async (blogId: number) => {
  const blog = await QueryBlogById(blogId);

  if (!blog) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Blog Detail Can't be found");
  }

  return blog;
};

export const GetAllPublishedBlog = async () => {
  const blogs = await QueryAllPublishedBlog();

  if (!blogs || blogs.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, "No published blog found");
  }

  const result = blogs.map((blog) => {
    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      author: blog.author.name,
    }
  })

  return result;
}

export const DeleteBlog = async (blogId: number) => {
  const blog = await QueryBlogById(blogId);

  if (!blog) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Blog Id can't be found");
  }

  const deletedBlog = await DeleteBlogById(blogId);

  return deletedBlog;
}