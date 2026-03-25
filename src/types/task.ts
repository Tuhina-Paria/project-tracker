export type Activity = {
  message: string;
  time: string;
};

export type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  timeline: Activity[]; // 👈 NEW
};