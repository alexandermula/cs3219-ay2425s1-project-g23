import http from "http";
import index, {updateDBStatus} from "./index.js";
import "dotenv/config";
import { connectToDB } from "./model/repository.js";

console.log("All env variables:", process.env); // Log all env variables to see if it includes DB_CLOUD_URI


const port = process.env.PORT || 3001;

const server = http.createServer(index);

await connectToDB().then(() => {
  console.log("MongoDB Connected!");
  
  updateDBStatus(true);
  server.listen(port);
  console.log("Question service server listening on http://localhost:" + port);
}).catch((err) => {
  console.error("Failed to connect to DB");
  console.error(err);

  // Still start the server to handle requests
  server.listen(port);
  console.log("Service started, but database connection failed.");
});