import { Router } from "express";
import * as controller from "../controllers/example";

export const example = Router();

example.get("/", controller.example);
