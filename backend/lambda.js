const awsServerlessExpress = require("@vendia/serverless-express"); // Lightweight alternative
const app = require("./index.js");

console.log(app);

const server = awsServerlessExpress({ app });

exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const response = await server(event, context);
  // Remove any duplicate CORS headers
  delete response.headers["Access-Control-Allow-Origin"];
  delete response.headers["Access-Control-Allow-Methods"];
  delete response.headers["Access-Control-Allow-Headers"];

  // If needed, re-add a single set of CORS headers
  response.headers["Access-Control-Allow-Origin"] = "*";
  response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
  response.headers["Access-Control-Allow-Headers"] = "*";

  return response;
};
