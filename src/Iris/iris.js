//引入express
const express = require("express");
const db = require(__dirname + "/../db_connect");
const session = require("express-session");

//引入router
const router = express.Router();

//引入需要用的套件
const { v4: uuidv4 } = require("uuid");

//路由名稱+功能
router.get("/try-uuid", (req, res) => {
  res.json({
    uuid1: uuidv4(),
    uuid2: uuidv4(),
  });
});

// 測試連線資料庫
router.get("/try-db", (req, res) => {
  // db.query( 'SELECT * FROM my_fav')
  db.query(
    "SELECT * FROM `my_fav` INNER JOIN `product` ON `my_fav`.`product_sid`=`product`.`sid`"
  )
    // 他本身是一個promise，所以這邊就直接then
    // 結果會回傳一個array，array的第一個值(results)才是要的，第二個(fields)是欄位的定義(可省)
    // 這邊第二個值沒要用到
    .then(([results, fields]) => {
      res.json(results);
    });
});

// 取得會員資料
router.get("/login", (req, res) => {
  db.query("SELECT * FROM member_list").then(([results, fields]) => {
    res.json(results);
  });
});

// 新增會員資料


// 更新會員資料
// 做到一半
router.post("/updateProfile", (req, res) => {
  const newProfile = req.body;
  const fulladdress = "" + req.body.address;
  const county = fulladdress.slice(0, 3);
  const district = fulladdress.slice(3, 6);
  const address = fulladdress.slice(6);

  const sql =
    "INSERT INTO `member_list` (`password`, `name`, `birthday`, `mobile`, `email`, `county`, `district`, `address`) VALUES ('" +
    newProfile.password +
    "','" +
    newProfile.familyname +
    newProfile.givenname +
    "','" +
    newProfile.birthday +
    "','" +
    newProfile.mobile +
    "','" +
    newProfile.email +
    "','" +
    county +
    "','" +
    district +
    "','" +
    address +
    "')";
  db.query(sql);
  res.json(newProfile);
});

//輸出路由
module.exports = router;

//網址列輸入 localhost:5000/example/try-uuid 看結果
// http://localhost:5000/member/try-db
