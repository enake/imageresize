import * as mysql from 'mysql'
import config from "../config/config";


const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

connection.connect();

export class logImgStats {

  constructor() {
    
  }

  log(fileName: string, message: string) {
    
    let entity = { fileName: fileName, action: message }

    console.log(entity)

    connection.query('INSERT INTO stats SET ?', entity, (err) => {
      if (err) {
        throw err
      }
    })
  }
}