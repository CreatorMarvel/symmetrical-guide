const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const Quote = require("inspirational-quotes");
let ejs = require("ejs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", newQuote());
});

app.post("/", function (req, res) {
  if (req.body.newQuote == "new-quote") {
    newQuote();
    console.log(newQuote());
  }
  res.redirect("/");
});

function newQuote() {
  let quote = Quote.getQuote();
  let text = quote.text;
  let author = quote.author;
  console.log(quote);

  let quotes = {
    textContent: text,
    author: author,
  };

  return quotes;
}

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
