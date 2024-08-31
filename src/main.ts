import express, { Express, Request, Response } from "express";
import env from "./utils/env";
import { mongoConnect } from "./utils/mongoose";
import cookieParser from "cookie-parser";
import { middleWareCheckorigin } from "./middlewares/middleware";

const app: Express = express();

mongoConnect();

app.use(express.json());
app.use(middleWareCheckorigin);
app.use(cookieParser());
// app.use('/user', userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(env.PORT, () => {
  console.log(`[server]: server is running at http://localhost:${env.PORT}`);
});
