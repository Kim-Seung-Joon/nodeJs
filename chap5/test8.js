var http = require("http");

var opts = {
  host: "www.google.com",
  port: 80,
  method: "POST",
  path: "/",
  headers: {}
};

var resData = "";

var req = http.request(opts, res => {
  res.on("data", chunk => {
    resData += chunk;
  });

  res.on("end", () => {
    console.log(resData);
  });
});

opts.headers["Content-Type"] = "application/x-www-form-urlencoded";
req.data = "q=actor";
opts.headers["Content-Length"] = req.data.length;

req.on("error", err => {
  console.log("오류 발생 : " + err.message);
});

req.write(req.data);
req.end();
