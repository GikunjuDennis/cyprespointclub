const mysql = require("mysql");
const bcrypt = require("bcryptjs");

// TODO: write the dbconnection and import it into the neccessary pages
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//async makes sure the server waits for some actions which might take some time to be done
//login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Please provide an email and password",
      });
      return;
    }
    db.query(
      "SELECT * FROM store WHERE email = ?",
      [email],
      async (error, results) => {
        //bcryptcompare compares the password being typed with the one in the db

        if (!results) {
          res.status(401).json({
            message: "Email or Password is incorrect",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//signup function for entrepreneurs
exports.signup = (req, res) => {; 

  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  } = req.body;

  db.query(
    "SELECT email FROM store WHERE email = ?",
    [email],
    async (error, results) => {
     
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
         res.status(400).json({
           message: "email already exists",
         });
      return;
      }
      if (password !== confirmPassword) {
        res.status(400).json({
          message: "Passwords do not match",
        });
      return;
    }
      
      let hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO entrepreneurSignup SET ?",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.status(201).json({
              results
            })
          }
        }
      );
    }
  );
};

