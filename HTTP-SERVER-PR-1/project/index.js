const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url == "/login") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`login successfully`);
  } else if (req.url == "/signup") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`sign up successfully`);
  } else if (req.url == "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`Welcome to contact page`);
  } else if (req.url == "/service") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`Welcome to service page`);
  }
});

server.listen(8090, () => {
  console.log("Server is running on port 8090");
});
