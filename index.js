const http = require("node:http");
const fs = require("node:fs");

const hostname = "0.0.0.0";
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  console.log(req);
  let url = req.url;

  switch (url) {
    case "/test":
      fs.readFile("./app/pages/test.html", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
        res.end(data);
      });

      //res.write("<h1>Welcome to my site!</h1>");

      break;
    case "/bla":
      res.write("<h1>The BLA page!</h1>");
      res.end();
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
