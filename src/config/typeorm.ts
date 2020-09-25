import { createConnection } from "typeorm";
import path from "path";

export async function connect() {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, "../entity/**/*{.ts,.js}")],
    synchronize: true,
  });
  console.log("DB connected");
}
