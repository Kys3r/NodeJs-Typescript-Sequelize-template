import express from "express";
import logger from "morgan";
import * as path from "path";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import MemoryStore from 'memorystore';
const mStore = MemoryStore(session);
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
import { example } from "./routes/example";

// Create Express server
export const app = express();

if (process.env.NODE_ENV == "development")
	app.set('trust proxy', true);

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser('adminadmin'));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb', parameterLimit: 10000}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(helmet());
app.use(express.static(path.join(__dirname, "../public")));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: PUT, DELETE, PATCH, POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(session({
    cookie: { maxAge: 36000000, secure: process.env.NODE_ENV == "production" ? true : false },
    store: new mStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: 'adminadmin',
	resave: false,
	saveUninitialized: true
}))

app.use("/", index);
app.use("/example", example);

app.use(errorNotFoundHandler);
app.use(errorHandler);
