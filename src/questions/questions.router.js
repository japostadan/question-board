import { Router } from "express";
import * as questionsController from "./questions.controller.js";

const router = Router();

router.get("/", questionsController.list);
router.post("/", questionsController.create);
router.post("/:id/vote", questionsController.vote);

export default router;
