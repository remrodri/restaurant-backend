import express from "express";
import { appCategoryRouter } from "./core/app-type/appCategoryRouter";

const router = express.Router();

router.use("/v1", appCategoryRouter);

export default router;
