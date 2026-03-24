import type { Task } from "../types/task";

const statuses: Task["status"][] = ["todo", "inprogress", "review", "done"];
const priorities: Task["priority"][] = ["low", "medium", "high", "critical"];

export const tasks: Task[] = Array.from({ length: 500 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Task ${i + 1}`,
  status: statuses[Math.floor(Math.random() * statuses.length)],
  priority: priorities[Math.floor(Math.random() * priorities.length)],
  assignee: `Person ${Math.floor(Math.random() * 10) + 1}`,
  startDate: Math.random() > 0.5 ? new Date().toISOString() : undefined,
  dueDate: new Date(
    Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000
  ).toISOString(),
}));