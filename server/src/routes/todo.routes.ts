import express from "express";
import { addTodoList, changeStatus, deleteTodo, getAllTodo } from "../controllers/todo.controller";

const todoRouter = express.Router();
todoRouter.post("/addTodo", addTodoList);
todoRouter.get("/getAll", getAllTodo);
todoRouter.delete('/delete/:id' ,deleteTodo)
todoRouter.put('/change/:id', changeStatus)
export default todoRouter;
