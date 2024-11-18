import cors from "cors";
import express from "express";
import type { Application, Request, Response } from "express";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
	res.status(200).json({ success: true, message: "🏃 Server is Running!" });
});

export default app;
