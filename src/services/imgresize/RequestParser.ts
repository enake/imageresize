import { Request } from "express"
import path from "path"

export class RequestParser {
  width: number | undefined 
  height: number | undefined
  fileName: string
  fileNameResize: string
  fileExt: string

  constructor(req: Request) {
    let fileNameExt = path.basename(req.path)
    this.fileExt = path.parse(fileNameExt).ext
    this.fileName = path.parse(fileNameExt).name

    if (req.query.size) {
      let sizeArr = req.query.size.split("x", 2)
      this.width = parseInt(sizeArr[0])
      if (isNaN(this.width)) this.width = undefined
      this.height = parseInt(sizeArr[1])
      if (isNaN(this.height)) this.height = undefined
    }

    this.fileNameResize =
      this.fileName + '-' +
      this.width + 'x' + this.height + this.fileExt
    this.fileName += this.fileExt

  }

}