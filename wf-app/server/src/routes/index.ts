import { Router } from "express";
import { addTodo } from "../controllers/todos";

const router = Router();

router.post("/todo", addTodo);

export default router;
