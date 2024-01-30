import express, { Request, Response } from "express";
import { addTodoListMysql, changeStatusMysql, deleteTodoMysql, getAllTodoMysql } from "../services/todo.service";
import exp from "constants";

const todoRouter = express.Router();

export async function addTodoList(req: Request, res: Response) {
    const { newTodo } = req.body;
  try {
    const result = addTodoListMysql(newTodo);
    console.log(result)
    res.status(200).json({
      data: result,
      message: "okale",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTodo(req: Request, res: Response) {
  try {
    const result = await getAllTodoMysql();
    res.status(200).json({
      data: result,
      message: " get okela",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(req: Request, res: Response) {
    const {id} = req.params
    try {
        const reuslt = await deleteTodoMysql(Number(id))
        res.status(200).json({
            message:"okd"
        })
    } catch (error) {
        console.log(error)
    }
}

export async function changeStatus(req: Request, res: Response) {
    const {id} = req.params
    const {status} = req.body
    try {
        const reuslt = await  changeStatusMysql( Number(id),Number(status))
        
        res.status(200).json({
            message:"okd"
        })
    } catch (error) {
        console.log(error)
    }
}

export default todoRouter;
