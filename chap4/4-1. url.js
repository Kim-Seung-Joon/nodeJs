var url = require("url");
var querystring = require("querystring");

// url을 파싱하여 객체를 만드는 parse
// format()  =  형변환
var curUrl = url.parse(
  "https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty"
);

var curStr = url.format(curUrl);

//파라미터 구분
var querystring = require("querystring");
var param = querystring.parse(curUrl.query);

console.log("주소 문자열 : " + curStr);
console.log(curUrl);

console.log("쿼리의 값은? ", param.query);
console.log("원본 값은? :", querystring.stringify(param));
