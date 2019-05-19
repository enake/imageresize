import path from "path"
import fs from "fs"
import sharp from "sharp"
import { logImgStats } from "../../utils/logImgStats"
import config from "../../config/config";
import { RequestParser } from "./requestParser";
import { ResponseParser } from "./ResponseParser";

export class imageObject {
  logImgStats: logImgStats
  reqImageObject: RequestParser

  constructor(reqImageObject: RequestParser) {
    this.logImgStats = new logImgStats()
    this.reqImageObject = reqImageObject
  }

  fileExists = () => {
    return fs.existsSync(path.join(config.workingFolder, this.reqImageObject.fileName))
  }

  fileResizeExists = () => {
    return fs.existsSync(path.join(config.workingResizeFolder, this.reqImageObject.fileNameResize))
  }

  async getFile(res: ResponseParser) {
    let returnObject
    if (this.fileExists()) {
      if (this.reqImageObject.height === undefined && this.reqImageObject.width === undefined) {
        this.logImgStats.log(this.reqImageObject.fileName, 'HIT')
        returnObject = { folder: config.workingFolder, file: this.reqImageObject.fileName }
      }

      if (!this.fileResizeExists()) {
        this.logImgStats.log(this.reqImageObject.fileNameResize, 'MISS')
        await this.resizeFile()
        res.sendFile()
      } else {
        this.logImgStats.log(this.reqImageObject.fileNameResize, 'HIT')
        res.sendFile();
      }

    } else {
      res.sendError()
    }
  }

  async resizeFile() {
    let fileResizePath = path.join(config.workingResizeFolder, this.reqImageObject.fileNameResize)
    let originalFile = path.join(config.workingFolder, this.reqImageObject.fileName)

    await sharp(originalFile)
      .resize(this.reqImageObject.width, this.reqImageObject.height, { fit: "fill" })
      .toFile(fileResizePath, function (err, info) {
        if (err) {
          console.log(err)
        }
      }).toBuffer()
    // .toBuffer().then(() => {
    //   res.sendFile()
    // })
  }

}