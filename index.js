const express = require("express");
const app = express();
var multer = require("multer");
var forms = multer();
var DB = require("./Connection.js");
app.use(express.json());
// const mongoose = require("mongoose");
// --------------------------------------------------- IMPORT ROUTES
const BusinessCategoryRoutes = require("./Routes/BusinessCategory.routes");
const BusinessSubCategoryRoutes = require("./Routes/BusinessSubCategory.routes");
const DesignationRoutes = require("./Routes/Designation.routes");
const DeskRoutes = require("./Routes/Desk.routes");
const UomRoutes = require("./Routes/Uom.routes");
const SecondaryUOM = require("./Routes/SecondaryUom.routes");
const ProductCategoryRoutes = require("./Routes/ProductCategory.routes");
const ProductSubCategory = require("./Routes/PrductSubCategory.routes");
const authRoutes = require("./Routes/AuthenticationRoutes");
const MainEnquiry = require("./Routes/Enquiry routes/Main.enquiry.routes");
const ProductEnquiry = require("./Routes/Enquiry routes/Product.enquiry.routes");
const MemberEnquiry = require("./Routes/Enquiry routes/MemberEnquiry.routes");
const Product = require("./Routes/Product.routes");

const userRoutes = require("./Routes/UserRoutes");
const BlogRoutes = require("./Routes/BlogRoutes");
const FaqRoutes = require("./Routes/FaqRoutes");
const SubCAtegory = require("./Routes/SubCategoriesRoutes");
// ----------------------------------------------------------------------------------------------

// -------------------------------------------------------- API VALIDATIONS-----------------------
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));

var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// ---------------------------------------------------------------------

//-------------------------------------------------------------------------  define Routes
app.use("/static", express.static("uploads"));
app.use("/designation", DesignationRoutes);
app.use("/business", BusinessCategoryRoutes);
app.use("/business-subcategory", BusinessSubCategoryRoutes);
app.use("/desk", DeskRoutes);
app.use("/uom", UomRoutes);
app.use("/secondary-uom", SecondaryUOM);
app.use("/product-category", ProductCategoryRoutes);
app.use("/product-subcategory", ProductSubCategory);
app.use("/enquiry/main", MainEnquiry);
app.use("/enquiry/product", ProductEnquiry);
app.use("/enquiry/member", MemberEnquiry);
app.use("/product", Product);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/blog", BlogRoutes);
// app.use("/faq", FaqRoutes);
app.use("/sub-category", SubCAtegory);
// ------------------------------------------------------

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
