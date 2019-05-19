import { Request, Response } from "express"
import { imageObject } from "./imageObject"
import { RequestParser } from "./requestParser";
import { ResponseParser } from "./ResponseParser";
import config from "../../config/config";
import * as ErrorHandler from "../../utils/ErrorHandler"

export default [
  {
    path: "/img*",
    method: "get",
    handler: async (req: Request, res: Response) => {

      let imageRequest = new RequestParser(req)
      let image = new imageObject(imageRequest)

      let responseImage = new ResponseParser(imageRequest, res)
      await image.getFile(responseImage)

      // if (responseImage.error) {
      //   ErrorHandler.notFoundError(res);
      // } else {
      //   res.sendFile(responseImage.fileName, { root: config.workingResizeFolder })
      // }
    }
  }
];
