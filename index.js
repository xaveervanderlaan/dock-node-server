const http = require("node:http");
const fs = require("node:fs");
const process = require("node:process");

const hostname = "0.0.0.0";
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let url = req.url;

  switch (url) {
    case "/test":
      fs.readFile("./app/pages/test.html", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(data);
        res.end(data);
      });

      break;
    case "/bla":
      fs.readFile("./app/pages/bla.html", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(data);
        res.end(data);
      });
      break;
    default:
      res.statusCode = 404;
      res.write("<h1>ERROR 404</h1>");
      res.end();
  }
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
