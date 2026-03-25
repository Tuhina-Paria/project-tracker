import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "done";
};

type TaskState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

  addTask: (task) =>
    set((state) => {
      const updated = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  updateTaskStatus: (id, status) =>
    set((state) => {
      const updated = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );

      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),
}));