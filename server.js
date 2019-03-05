var express = require("express");
var app = express();
var client_id = "KKbu_ZhwhMfuJyTh6D8a";
var client_secret = "vYVQrRu_oZ";
var keyword = "증인";

app.get("/search/movie", function(req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/movie?query="+
    encodeURI(req.query.query); // json 결과
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret
    }
  };

  request.get(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});


app.listen(3000, function() {

});
