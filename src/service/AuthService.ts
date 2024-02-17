import { StatusCodes } from "http-status-codes";
import { RegisterRequest } from "../model/AuthModel";
import {
  CreateUser,
  QueryAllUsers,
  QueryUserByEmail,
} from "../repository/AuthRepository";
import { CustomError } from "../utils/ErrorHandling";

export const RegisterUser = async (body: RegisterRequest) => {
  const isRegistered = await QueryUserByEmail(body.email);

  if (isRegistered) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "The user has already registered",
    );
  }

  const user = await CreateUser(body.name, body.email);

  if (!user) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Data");
  }

  return user;
};

export const GetAllUsers = async () => {
  const users = await QueryAllUsers();

  return users;
};
