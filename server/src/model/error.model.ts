export class HttpError extends Error {
  status: number;

  constructor(status = 500, message = 'HttpError') {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.status = status;
  }
}
