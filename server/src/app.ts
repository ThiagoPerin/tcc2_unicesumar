import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./api/router";
import helmet from "helmet";

const app = express();

app.set("trust proxy", 1);

if (process.env["NODE_ENV"] !== "development") {
    app.use(helmet());
}

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", apiRouter);
app.get("/", (_, res) => { res.redirect("/app"); });
app.use(express.static("static"));

export default app;
