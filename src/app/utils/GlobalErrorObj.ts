import { TErrorSources } from "../interface/error.interface";
import status from "http-status";
class GlobalErrorObj {
  constructor(
    public statusCode: number = status.INTERNAL_SERVER_ERROR,
    public message: string = "An unknown error occurred!",
    public errorSources: TErrorSources = [],
    public success: boolean = false
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.errorSources = errorSources;
  }
}
export default GlobalErrorObj;
