import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { handleZodError } from "./ZodError";
import { ApiError } from "./ApiError";

const handlePrismaError = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        return {
          statusCode: 409,
          success: false,
          message: "Unique constraint violation.",
          errors: [`Field(s): ${(error.meta?.target as string[]).join(", ")}`],
        };
      case "P2025": // Record not found
        return {
          statusCode: 404,
          success: false,
          message: "The requested record was not found.",
          errors: [],
        };
      default:
        return {
          statusCode: 400,
          success: false,
          message: "A database error occurred.",
          errors: error,
        };
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      statusCode: 422,
      success: false,
      message: "Validation error.",
      errors: [error.message],
    };
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      statusCode: 500,
      success: false,
      message: "Database initialization error.",
      errors: [],
    };
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      statusCode: 500,
      success: false,
      message: "Critical database engine error.",
      errors: [],
    };
  }
  return {
    statusCode: 500,
    success: false,
    message: "Unexpected database error.",
    errors: [],
  };
};

const asyncHandler = (requestHandler: Function) => {
  return async (req: Request) => {
    try {
      const resp = await requestHandler(req);
      return resp;
    } catch (error) {
      if (error instanceof ZodError) {
        error = handleZodError(error);
      }

      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            statusCode: error.statusCode || 500,
            data: error.data,
            success: error.success,
            errors: error.errors,
            message: error.message,
          },
          { status: error.statusCode || 500 }
        );
      }

      // Prisma error handling
      if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientRustPanicError
      ) {
        const prismaErrorResponse = handlePrismaError(error);
        return NextResponse.json(prismaErrorResponse, {
          status: prismaErrorResponse.statusCode,
        });
      }

      // General fallback for unexpected errors
      return NextResponse.json(
        {
          statusCode: 500,
          data: null,
          success: false,
          errors: [],
          message: "Internal server error",
        },
        {
          status: 500,
        }
      );
    }
  };
};

export { asyncHandler };