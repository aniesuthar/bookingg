import { ZodError } from "zod";
import { ApiError } from "@/utils/ApiError";

// Function to format Zod errors
const formatZodErrors = (error: ZodError): any[] => {
  return error.errors.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
};//TODO in production do we need to show all this information 

// Function to handle Zod errors and convert them to ApiError format
const handleZodError = (error: ZodError): ApiError => {
  const formattedErrors = formatZodErrors(error);
  return new ApiError(400, "Validation failed", formattedErrors);
};

export { handleZodError };
