import { Router } from "express";
import { createEvent, getEventById, getEvents } from "../controllers/event.controller";

const router = Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;
