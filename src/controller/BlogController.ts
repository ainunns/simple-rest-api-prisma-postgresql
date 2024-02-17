import { Request, Response } from "express";
import { BlogPostRequest } from "../model/BlogModel";
import * as BlogService from "../service/BlogService";
import { responseError, responseSuccess } from "../utils/API-Response";
import { StatusCodes } from "http-status-codes";

export const CreateBlogPost = async (req: Request, res: Response) => {
  const body: BlogPostRequest = req.body;

  try {
    const data = await BlogService.CreateBlog(body);
    responseSuccess(
      res,
      StatusCodes.OK,
      true,
      "Blog post created successfully",
      data,
    );
  } catch (error) {
    responseError(res, false, error);
  }
};

export const PublishBlog = async (req: Request, res: Response) => {
  const blogId = Number(req.body.id);
  console.log(blogId);

  try {
    const data = await BlogService.PublishBlog(blogId);
    responseSuccess(res, StatusCodes.OK, true, "Blog published successfully", data);
  } catch (error) {
    responseError(res, false, error);
  }

}

export const GetDetailBlog = async (req: Request, res: Response) => {
  const blogId = Number(req.params.id);

  try {
    const data = await BlogService.GetDetailBlog(blogId);
    responseSuccess(
      res,
      StatusCodes.OK,
      true,
      "Succesfully get detail blog",
      data,
    );
  } catch (error) {
    responseError(res, false, error);
  }
};

export const GetAllPublishedBlog = async (req: Request, res: Response) => {
  try {
    const data = await BlogService.GetAllPublishedBlog();
    responseSuccess(res, StatusCodes.OK, true, "Succesfully get all published blog", data);
  } catch (error) {
    responseError(res, false, error);
  }
}

export const DeleteBlogById = async (req: Request, res: Response) => {
  const blogId = Number(req.params.id);

  try {
    const data = await BlogService.DeleteBlog(blogId);
    responseSuccess(res, StatusCodes.OK, true, "Blog deleted successfully", data);
  } catch (error) {
    responseError(res, false, error);
  }
}