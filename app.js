const express = require("express");
const bdp = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const enc = bdp.urlencoded({ extended: true });

app.use(express.static(__dirname + "/public"));
var url ="mongodb+srv://sudh:pugsudha@atlascluster.qcufaut.mongodb.net/?retryWrites=true&w=majority";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/web.html");
});

app.post("/info", enc, (req, res) => {
  let name1 = req.body.name1;
  let email = req.body.email;
  console.log(name1,email);
  MongoClient.connect(url, async (err, db)=> {
    if (err) throw err;
    console.log("database created");
    const dbo = db.db("stocktips");
    const doc = {
      name1:name1,
      email:email
    };
    const result = await dbo.collection("tips").insertOne(doc);
    db.close();
  });
  res.send("hcdcuds");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Application started and Listening on port 3000");
});

