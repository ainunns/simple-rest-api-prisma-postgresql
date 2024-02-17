import { Prisma } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  code: number = StatusCodes.INTERNAL_SERVER_ERROR;
  errors: object | null;

  constructor(code: number, message: any, error: object | null = null) {
    super(message);
    this.code = code;
    this.errors = error;
  }
}

export const PrismaErrorTypes = [
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientKnownRequestError,
];

export const getCustomErrorObject = (err: unknown) => {
  if (err instanceof CustomError) {
    return err;
  }

  const error = new CustomError(
    StatusCodes.INTERNAL_SERVER_ERROR,
    ReasonPhrases.INTERNAL_SERVER_ERROR,
  );

  PrismaErrorTypes.forEach((e) => {
    if (err instanceof e) {
      error.code = StatusCodes.BAD_REQUEST;
      error.name = err.name;
      error.message = err.message;
    }
  });

  return error;
};
