import path from "path"

const config =
{
  workingResizeFolder: path.join(__dirname, '../../public/cache'),
  workingFolder: path.join(__dirname, '../../public'),
  viewsFolder: path.join(__dirname, "../../views"),
  host: 'db',
  user: 'imgstats_user',
  password: '123',
  database: 'imgstats'
}

export default config