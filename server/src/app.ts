import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./api/router";
import helmet from "helmet";
import { hasAuthorization } from "./middlewares";
import loginRouter from "./router";

const app = express();

if (process.env["NODE_ENV"] !== "development") {
    app.use(helmet());
}

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_, res) => { res.redirect("/app"); });
app.use("/login", loginRouter);
app.use("/app", [hasAuthorization]);
app.use("/api/v1", [hasAuthorization], apiRouter);
app.use(express.static("static"));

export default app;
