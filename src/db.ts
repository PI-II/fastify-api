import mysql from "mysql2/promise";

import { DB } from "./enviroment";
export default await mysql.createConnection({
  ...DB, 
});