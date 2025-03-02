import express, { NextFunction, Request, Response } from "express";
import { config } from "./config";
import { initApp as initAppLog } from "./common/helpers/logger.helper";
import { connectDB } from "./db";
import ApiController from "./controllers/index";
import { handleError } from "./middlewares/error.handler";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

app.use("/api", ApiController);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { status, ...rest } = handleError(err);
  res.status(status).json(rest);
});

app.listen(config.PORT, () => {
  initAppLog();
  setupSwagger(app);
  connectDB();
});
