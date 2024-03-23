// console.log("Hello, world!")
import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();
const app: Express = express();
const PORT = 8080;

app.use(express.json()); // ミドルウェアの設定
app.use(cors());
app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany(); //全てのtodoを取得
  return res.json(allTodos);
});
app.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    }); //全てのtodoを取得
    return res.json(createTodo);
  } catch(e) {
    console.log(req.body);
    return res.status(400).json({ message: "error" });
  }
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const id = Number(req.params.id);
    const editTodo = await prisma.todo.update({
      where : { id },
      data: {
        title,
        isCompleted,
      },
    }); //全てのtodoを取得
    return res.json(editTodo);
  } catch(e) {
    return res.status(400).json({ message: "error" });
  }
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
      where : { id },
    }); //全てのtodoを取得
    return res.json(deleteTodo);
  } catch(e) {
    return res.status(400).json({ message: "error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
