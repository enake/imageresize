import crypto from "crypto";

export class hash {
  stringToHash: string
  constructor(hashObject: object) {
      this.stringToHash = JSON.stringify(hashObject)
  }

  getHash() : string {
    return crypto.createHash('md5').update(this.stringToHash).digest("hex");
  }
}