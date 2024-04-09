const express = require("express");

const { google } = require("googleapis");

const app = express();

 // Use EJS as the default template engine


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.get("/", (req, res) => {
  res.render("index");
});

// app.post("/register", async (req, res) => {
//   const {name, email, password, phoneNumber, erpid } = req.body;
//   const auth = new google.auth.GoogleAuth({
//     keyFile: "kunalproject-773926-b4989923d10a.json",
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
//   });

//   const client = await auth.getClient();

//   const googleSheets = google.sheets({ version: "v4", auth: client });

//   const spreadsheetId = "1513EIc-Y9v9q4UoyLC-wP_9l6dd4YCqUz1729fYlHiQ";

//   const metaData = await googleSheets.spreadsheets.get({
//     auth,

//     spreadsheetId,
//   });

//   //get data from googleSheets
//   const getRoow = await googleSheets.spreadsheets.values.get({
//     auth,

//     spreadsheetId,

//     range: "Sheet1!A:E",
//   });

//   //write data in google sheets

//   const writeRoow = await googleSheets.spreadsheets.values.append({
//     auth,

//     spreadsheetId,

//     range: "Sheet1!A:E",

//     valueInputOption: "USER_ENTERED",

//     resource: {
//       values: [[name, email, phoneNumber, erpid, password]],
//     },
//   });

//   res.render("index");
// //   // res.send(metaData.data);

// });



app.post("/", async (req, res) => {
  const {location, request, name, name2 } = req.body;
  const auth = new google.auth.GoogleAuth({
    keyFile: "kunalproject-773926-b4989923d10a.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1513EIc-Y9v9q4UoyLC-wP_9l6dd4YCqUz1729fYlHiQ";

  const metaData = await googleSheets.spreadsheets.get({
    auth,

    spreadsheetId,
  });

  //get data from googleSheets
  const getRoow = await googleSheets.spreadsheets.values.get({
    auth,

    spreadsheetId,

    range: "Sheet1!A:E",
  });

  //write data in google sheets

  const writeRoow = googleSheets.spreadsheets.values.append({
    auth,

    spreadsheetId,

    range: "Sheet1!A:E",

    valueInputOption: "USER_ENTERED",

    resource: {
      values: [[location, request, name, name2]],
    },
  });

  res.render("index");
//   // res.send(metaData.data);

});

app.listen(2000, (req, res) => console.log("runing on 2000"));
