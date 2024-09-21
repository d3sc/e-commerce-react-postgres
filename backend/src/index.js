import express from "express";
import FileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { default as routes } from "./routes/route.js";
import { default as paymentRoutes } from "./routes/paymentRoute.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(FileUpload());
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/", routes);
app.use("/api/payment", paymentRoutes);

app.listen(port, () => {
  console.log("port berjalan di", port);
});
