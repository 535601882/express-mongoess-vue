const express = require('express')
const path = require("path")
const app = express()

const database = require("./database/index.js")

const bodyParser = require('body-parser')
//引入multer
const multer = require('multer')
//设置上传文件存储地址
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'./public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
    }
  }
})


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/getUsers",database.getUsers)
app.get("/getUserId",database.getUserId)
app.post("/addUser",database.addUser)
app.delete("/delUser",database.delUser)
app.put("/editUser",database.editUser)
app.post("/uploadImg",upload.single('file'),database.uploadImg)

app.listen(3001,()=>{
  console.log("app listening on port 3001")
})
