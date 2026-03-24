import { create } from "zustand";
import type { Task } from "../types/task";
import { tasks as initialTasks } from "../utils/data";

type TaskState = {
  tasks: Task[];
  updateTaskStatus: (id: string, status: Task["status"]) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "null") || initialTasks,

  updateTaskStatus: (id, status) =>
    set((state) => {
      const updated = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );

      localStorage.setItem("tasks", JSON.stringify(updated));

      return { tasks: updated };
    }),
}));