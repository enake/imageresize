import { Response } from "express"
import config from "../../config/config";
import { RequestParser } from "./requestParser";
import * as ErrorHandler from "../../utils/ErrorHandler"


export class ResponseParser {
  requestImage: RequestParser
  res: Response

  constructor (requestImage:RequestParser, res: Response) {
    this.requestImage = requestImage
    this.res = res
  }

  sendFile() {
    this.res.sendFile(this.requestImage.fileNameResize, { root: config.workingResizeFolder })
  }

  sendError() {
    ErrorHandler.notFoundError(this.res);
  }
  
}