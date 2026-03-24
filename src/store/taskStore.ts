import { create } from "zustand";
import type { Task } from "../types/task";
import { tasks as initialTasks } from "../utils/data";

type TaskStore = {
  tasks: Task[];

  addTask: (task: Task) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
}));