
const path=require('path')



const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");


dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");

const dbConection = require("./config/databse");

const categoryRoute = require("./routes/categoryRoutes");

const subCategoryRoute = require("./routes/subCategoryRoutes");
const productRoute= require("./routes/productRoute");
const userRoute= require("./routes/UserRoute");
const authRoute= require("./routes/authRoute");

const brandRoute = require("./routes/BrandRoute");
const globalError = require("./middelwares/errorMiddelware");


dbConection();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/subcategory", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new ApiError("message", statusCode));
});

//global errors handeling middleware
app.use(globalError);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Eror:${err.name}|${err.message}`);
  server.close(() => {
    console.error("shut down");
    process.exit(1);
  });   
});
