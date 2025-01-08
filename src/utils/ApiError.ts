class ApiError extends Error {
  public statusCode: number;
  public data: null;
  public success: boolean;
  public unauthorised : boolean;
  public errors: any[];
  public message: string;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    unauthorised:boolean = false,
    errors: any[] = [],
    stack?: string
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.unauthorised = unauthorised

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
