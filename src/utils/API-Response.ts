import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError, getCustomErrorObject } from "./ErrorHandling";

export const responseSuccess = (
  res: Response,
  code: number = StatusCodes.OK,
  success: true,
  message: string | null = null,
  data: Array<object> | object | undefined,
) => {
  return res.status(code).json({
    success,
    ...(message && { message }),
    data,
  });
};

export const responseError = (res: Response, success: false, error: any) => {
  const errorObject: CustomError = getCustomErrorObject(error);

  return res.status(errorObject.code).json({
    success,
    ...(errorObject.message && { message: errorObject.message }),
    ...(errorObject.errors && { error: errorObject.errors }),
  });
};
