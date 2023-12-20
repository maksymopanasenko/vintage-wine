const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
require("dotenv").config();

const globalConfigs = require("./backend/routes/globalConfigs");
// ./backend/routes/globalConfigs
const customers = require("./backend/routes/customers");
const catalog = require("./backend/routes/catalog");
const products = require("./backend/routes/products");
const colors = require("./backend/routes/colors");
const sizes = require("./backend/routes/sizes");
const filters = require("./backend/routes/filters");
const subscribers = require("./backend/routes/subscribers");
const cart = require("./backend/routes/cart");
const orders = require("./backend/routes/orders");
const links = require("./backend/routes/links");
const pages = require("./backend/routes/pages");
const slides = require("./backend/routes/slides");
const wishlist = require("./backend/routes/wishlist");
const comments = require("./backend/routes/comments");
const shippingMethods = require("./backend/routes/shippingMethods");
const paymentMethods = require("./backend/routes/paymentMethods");
const partners = require("./backend/routes/partners");
const excursions = require("./backend/routes/excursions");
const news = require("./backend/routes/news");
const lastViewedProducts = require("./backend/routes/lastViewedProducts");
const shares = require("./backend/routes/shares");
const contact = require("./backend/routes/contact");
// const mainRoute = require('./routes/index');

const app = express();

app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./backend/config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./backend/config/passport")(passport);

// Use Routes
app.use("/api/configs", globalConfigs);
app.use("/api/customers", customers);
app.use("/api/catalog", catalog);
app.use("/api/products", products);
app.use("/api/colors", colors);
app.use("/api/sizes", sizes);
app.use("/api/filters", filters);
app.use("/api/subscribers", subscribers);
app.use("/api/cart", cart);
app.use("/api/orders", orders);
app.use("/api/links", links);
app.use("/api/pages", pages);
app.use("/api/slides", slides);
app.use("/api/wishlist", wishlist);
app.use("/api/comments", comments);
app.use("/api/shipping-methods", shippingMethods);
app.use("/api/payment-methods", paymentMethods);
app.use("/api/partners", partners);
app.use("/api/excursions", excursions);
app.use("/api/news", news);
app.use("/api/last-viewed-products", lastViewedProducts);
app.use("/api/shares", shares);
app.use("/api/contact", contact);
// app.use('/', mainRoute);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
