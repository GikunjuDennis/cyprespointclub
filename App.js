const express = require("express");
const path = require("path");
const mysql = require("mysql");

const app = express();

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '81911918',
    database: 'cypresspointclub',
  });

  db.connect((error) => {
    if (error) {
      console.log(Error);
    } else {
      console.log("MySQL Connected...");
    }
  });

 //parse URL encoded bodies as sent by HTML forms. Enables us to grab data from any form
 app.use(
   express.urlencoded({
     extended: false,
   })
 )

 //Parse JSON bodies as sent by API clients
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/pages"));

const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));

app.listen(4000, () => {
  console.log("Server started on PORT 4000");
});