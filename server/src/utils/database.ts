import  dotenv  from 'dotenv';
import mysql2 from "mysql2"
dotenv.config()

const conection = mysql2.createPool({
    host:  process.env.LOCALHOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database:process.env.DATABASE_NAME,
    port: Number (process.env.PORT)
});
const database = conection.promise()
 export default database