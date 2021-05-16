export class HttpException extends Error {
    status: number;
    message: string;
    errors: Array<{}> | boolean;

    constructor(status: number, message: string, errors?: Array<{}> | boolean) {
      super(message);
      this.status = status;
      this.message = message; 
      this.errors = errors;
    }
  }
