class ApiResponse<T> {
  public statusCode: number;
  public data: T;
  public message: string;
  public success: boolean;
  public unAuthorized : boolean;

  constructor(statusCode: number, data: T, message: string = "Success" , unAuthorized:boolean = false) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.unAuthorized = unAuthorized
  }
}

export { ApiResponse };
