//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }],

  };


  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/bffabc9448",
    method: "POST",
    headers: {
      "Authorization": "Daniel1 65587b4cdf874fe4c55f23ac345b5e4b-us3"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
      console.log(response.statusCode);
    }else {
      res.sendFile(__dirname + "/failure.html");
    }
  }


  });
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// 65587b4cdf874fe4c55f23ac345b5e4b-us3
// bffabc9448
