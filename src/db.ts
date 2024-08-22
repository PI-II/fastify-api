import mysql, { type QueryResult } from "mysql2/promise";
import { DB } from "./enviroment";

const pool = mysql.createPool({
  ...DB,
});

export default async function sql<T = QueryResult>(
  queryParts: TemplateStringsArray,
  ...values: unknown[]
) {
  if (values.length <= 0) {
    const [res] = await pool.execute(queryParts[0]);
    return res;
  }

  const query = queryParts.join("?");

  const [res] = await pool.execute(query, values);
  return res as T;
}
//temos redos