const http = require("node:http");
const fs = require("node:fs");
const process = require("node:process");
const router = require("find-my-way")({
  defaultRoute: (req, res) => {
    res.statusCode = 404;
    res.end();
  },
});

const hostname = "0.0.0.0";
const port = 3000;

router.on("GET", "/", (req, res, params) => {
  res.end('{"message":"hello world"}');
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  router.lookup(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

console.log("Starting application");

const gracefulShutdown = () => {
  console.info("Shutting down...");
  process.exit();
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown); // Sent by nodemon
