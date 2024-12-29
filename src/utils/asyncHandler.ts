import { ZodError } from "zod";
import { ApiError } from "@/utils/ApiError"; // Import your ApiError class
import { handleZodError } from "@/utils/ZodError";
import { NextResponse } from "next/server";

const asyncHandler = (requestHandler: Function) => {
  return async (req: Request) => {
    try {
      await requestHandler(req);
    } catch (error) {
      // console.log(error)
      if (error instanceof ZodError) {
        error = handleZodError(error);
      }
      if (error instanceof ApiError) {
        return NextResponse.json({
          statusCode: error.statusCode || 500,
          data: error.data,
          success: error.success,
          errors: error.errors,
          message: error.message,
        },{status:error.statusCode || 500});
      } else {
        return NextResponse.json({
          statusCode: 500,
          data: null,
          success: false,
          errors: [],
          message: "Internal server error",
        },{
          status: 500
        });
      }
    }
  };
};

export { asyncHandler };
