require('dotenv').config()
module.exports= {
  "username"      :     `${process.env.DB_USERNAME}`, //Type app id here
  "password"   :     `${process.env.DB_PASSWORD}`, //Type app secret here
  "database"      :     `${process.env.DATABASE}`,
  "host"      :     `${process.env.DB_HOST}`,
  "port"      :     `${process.env.DB_PORT}`,
  "dialect"      :     "mysql"
}
