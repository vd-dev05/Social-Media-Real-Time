import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import EndpointRouterV1 from "@/routes/ver1/endpoints";
import { logger } from "@/middleware/logger";



const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);



Object.values(EndpointRouterV1).forEach(ep => {
  app.use('/api/v1' + ep.path, ep.router);
});


export default app;
