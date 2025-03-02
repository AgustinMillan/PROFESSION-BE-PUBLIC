import { ZodError } from "zod";

export class CustomError {
  constructor(message: string, status: number, error: any) {
    this.message = message;
    this.status = status;
    this.error = error;
  }
  message;
  status;
  error;
}

const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    return {
      status: 400,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
    };
  }

  if (error instanceof CustomError) {
    return {
      status: error.status,
      message: error.message,
      error: error.error,
    };
  }

  return {
    status: 500,
    message: "Ha ocurrido un error desconocido.",
  };
};

export { handleError };
