import "reflect-metadata";
import { startServer } from "./server";
import { connect } from "./config/typeorm";

async function main() {
  connect();
  const app = await startServer();
  app.listen(process.env.APP_PORT || 3000);
  console.log("Server on port", process.env.APP_PORT || 3000);
}

main();
