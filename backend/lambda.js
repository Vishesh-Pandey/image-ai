const awsServerlessExpress = require("@vendia/serverless-express"); // Lightweight alternative
const app = require("./index.js");

console.log(app);

const server = awsServerlessExpress({ app });

exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  return server(event, context);
};
