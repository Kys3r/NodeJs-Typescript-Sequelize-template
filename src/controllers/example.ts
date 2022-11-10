import { Request, Response } from "express";
import db from '../database/models';

export const example = async (req: Request, res: Response): Promise<void> => {
    res.send(await db.example_table.findAll());
};
