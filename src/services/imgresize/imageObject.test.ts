import { imageObject } from "./imageObject"
import fs from "fs"
import path from "path"
import config from "../../config/config"

///jest.mock("request-promise");

it.skip('skip', () => { })
describe('resize image', () => {
  it('resize', async () => {
    const imageRequest = {
      fileExt: '.jpg',
      fileName: 'lukas-blazek-320606-unsplash.jpg',
      width: 10,
      height: 10,
      fileNameResize: 'lukas-blazek-320606-unsplash-10x10.jpg'
    }

    let imageObjectInstance = new imageObject(imageRequest)
    await imageObjectInstance.resizeFile()

    expect(true).toBe(imageObjectInstance.fileResizeExists())
    fs.unlink(path.join(config.workingResizeFolder, imageRequest.fileNameResize))
  })
})