export type Task = {
  id: string;
  title: string;

  status: "todo" | "inprogress" | "review" | "done";

  priority: "low" | "medium" | "high" | "critical";

  assignee: string;

  startDate?: string; 
  dueDate?: string;   
};