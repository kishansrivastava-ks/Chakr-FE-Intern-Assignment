import { promises as fs } from "fs";
import path from "path";

const tasksFilePath = path.join(process.cwd(), "data", "tasksData.json");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Get all tasks
      try {
        const fileContents = await fs.readFile(tasksFilePath, "utf8");
        const tasks = JSON.parse(fileContents);
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: "Failed to load tasks" });
      }
      break;

    case "POST":
      // Add a new task
      try {
        const newTask = req.body;
        const fileContents = await fs.readFile(tasksFilePath, "utf8");
        const tasks = JSON.parse(fileContents);
        tasks.push(newTask);
        await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
        res.status(201).json(newTask);
      } catch (error) {
        res.status(500).json({ error: "Failed to save task" });
      }
      break;

    case "PUT":
      // Update an existing task
      try {
        const updatedTask = req.body;
        const fileContents = await fs.readFile(tasksFilePath, "utf8");
        let tasks = JSON.parse(fileContents);
        tasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
      }
      break;

    case "DELETE":
      // Delete a task
      try {
        const { id } = req.body;
        const fileContents = await fs.readFile(tasksFilePath, "utf8");
        let tasks = JSON.parse(fileContents);
        tasks = tasks.filter((task) => task.id !== id);
        await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
        res.status(200).json({ message: "Task deleted" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
