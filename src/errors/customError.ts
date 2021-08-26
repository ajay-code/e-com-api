export class CustomError extends Error {
  statusCode;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (msg: string, statusCode: number) => {
  return new CustomError(msg, statusCode);
};
