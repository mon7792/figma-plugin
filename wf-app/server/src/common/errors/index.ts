export class BaseError extends Error {
    public readonly statusCode: number;
    public readonly displayMessage: string;
  
    //  message contains error from library
    //  displayMessage contains text to display to user in case of error.  
    constructor(statusCode: number, message: string, displayMessage: string) {
      super(message);
  
      this.statusCode = statusCode;
      this.displayMessage = displayMessage;
  
      Object.setPrototypeOf(this, BaseError.prototype);
    }
  }