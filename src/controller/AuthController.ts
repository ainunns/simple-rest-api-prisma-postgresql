import { Request, Response } from "express";
import { responseError, responseSuccess } from "../utils/API-Response";
import * as AuthService from "../service/AuthService";
import { RegisterRequest } from "../model/AuthModel";
import { StatusCodes } from "http-status-codes";

export const RegisterUser = async (req: Request, res: Response) => {
  const body: RegisterRequest = req.body;

  try {
    const data = await AuthService.RegisterUser(body);
    responseSuccess(res, StatusCodes.OK, true, "User registered successfully", {
      id: data.id,
      name: data.name,
      email: data.email,
    });
  } catch (error) {
    responseError(res, false, error);
  }
};

export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await AuthService.GetAllUsers();
    responseSuccess(
      res,
      StatusCodes.OK,
      true,
      "Successfully get all users",
      data,
    );
  } catch (error) {
    responseError(res, false, error);
  }
};
