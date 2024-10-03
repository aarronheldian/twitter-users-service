import express, { Express } from "express";
import env from "./utils/env";
import { mongoConnect } from "./utils/mongoose";
import cookieParser from "cookie-parser";
import middleWareCheckorigin from "./middlewares/checkOrigin.middleware";
import middleWareErrorHandler from "./middlewares/errorHandler.middleware";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.route";

const app: Express = express();
app.set("trust proxy", 1);

mongoConnect();

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cors());
app.use(mongoSanitize());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use(middleWareCheckorigin);

app.use("/api/auth", authRoute);

app.use(middleWareErrorHandler);

app.listen(env.PORT, () => {
  console.log(`[server]: server is running at http://localhost:${env.PORT}`);
});
