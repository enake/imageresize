import { Request, Response } from "express"
import * as mysql from 'mysql'
import fs from "fs"
import config from "../../config/config";

export default [
  {
    path: "/stats",
    method: "get",
    handler: async (req: Request, res: Response) => {
      let statsList: Array<any> = []
      let imgOrigCount: Array<string>
      let imgCacheCount: Array<string>
      const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
      });

      connection.connect();

      connection.query('SELECT action as action, count(action) as count, fileName FROM stats GROUP BY action, fileName;',
        (err, rows, fields) => {
          if (!err) {
            for (var i = 0; i < rows.length; i++) {

              // Create an object to save current row's data
              var stats = {
                'fileName': rows[i].fileName,
                'action': rows[i].action,
                'count': rows[i].count
              }
              // Add object into array
              statsList.push(stats);
            }

            imgOrigCount = fs.readdirSync(config.workingFolder)
              .filter((file) => {
                if (file.indexOf(".") > 1) return file;
              })

            imgCacheCount = fs.readdirSync(config.workingResizeFolder)
              .filter((file) => {
                if (file.indexOf(".") > 1) return file;
              })

            res.render('index', {
              statsList: statsList,
              imgOrigCount: imgOrigCount.length,
              imgCacheCount: imgCacheCount.length
            });

          } else
            console.log('Error while performing Query.');
        });
    }
  }
];