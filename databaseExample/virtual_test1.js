var mongodb = require("mongodb");
var mongoose = require("mongoose");

// ===== DB 연결 =======
var database;
var UserModel;
var UserSchema;

function connectDB() {
  var databaseUrl = "mongodb://localhost:27017/local";

  //데이터베이스 연결
  // 버전에 따른 set
  mongoose.set("useCreateIndex", true);
  mongoose.connect(databaseUrl, { useNewUrlParser: true });
  database = mongoose.connection;

  database.on("error", console.error.bind(console, "몽구스 연결 오류"));
  database.on("open", function() {
    console.log("데이터베이스에 연결되었습니다. :" + databaseUrl);

    // 유저 스키마 및 모델 객체 생성
    createUserSchema();

    // test진행
    doTest();
  });

  database.on("disconnected", connectDB);
}

function createUserSchema() {
  // 스키마에 대한 정의
  // 여기서 비밀번호는 암호화를 위해 특별한 설정

  UserSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, index: "hashed", default: "" },
    age: { type: Number, default: -1 },
    created_at: { type: Date, index: { unique: false }, default: Date.now },
    updated_at: { type: Date, index: { unique: false }, default: Date.now }
  });

  //info를 virtual 메소드로 정의한다
  UserSchema.virtual("info")
    .set(function(info) {
      var splitted = info.split(" ");
      this.id = splitted[0];
      this.name = splitted[1];
      console.log("virtual info 설정 : %s, %s", this.id, this.name);
    })
    .get(function() {
      return this.id + "" + this.name;
    });

  console.log("UserModel에 대한 정의");

  //UserModel
  UserModel = mongoose.model("users4", UserSchema);
  console.log("UserModel 정의함");
}

function doTest() {
  //UserModel 인스턴스 생성
  //id, name 속성은 할당하지 않고 info 속성만 할당함

  var user = new UserModel({ info: "test01 소녀시대" });

  // save()로 저장
  user.save(function(err) {
    if (err) {
      throw err;
    }

    console.log("사용자 데이터 추가함");

    findAll();
  });

  console.log("info 속성에 값을 할당함.");
  console.log("id :%s, name: %s", user.id, user.name);
}

function findAll() {
  UserModel.find({}, function(err, results) {
    if (err) {
      throw err;
    }

    if (results) {
      console.log(
        "조회된 user 문서 객체 #0 -> id: %s, name: %s",
        results[0]._doc.id,
        results[0]._doc.name);
    }
  });
}

// 데이터베이스 호출
connectDB();
