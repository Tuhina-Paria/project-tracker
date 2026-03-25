import { useState } from "react";
import { useTaskStore } from "./store/taskStore";

const ROW_HEIGHT = 70;
const VISIBLE_COUNT = 8;

type Status = "todo" | "inprogress" | "review" | "done";
type Priority = "low" | "medium" | "high" | "critical";

function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [view, setView] = useState<"kanban" | "list">("kanban");

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [status, setStatus] = useState<Status>("todo");
  const [assignee, setAssignee] = useState("");

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | Priority
  >("all");

  const [scrollTop, setScrollTop] = useState(0);

  const getAvatar = (name: string) => {
    if (!name) return "NA";
    const match = name.match(/\d+/);
    if (match) return "P" + match[0];
    return name.charAt(0).toUpperCase();
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (priorityFilter === "all" || task.priority === priorityFilter)
    );
  });

  const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const visibleTasks = filteredTasks.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  const handleAddTask = () => {
    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title,
      status,
      priority,
      assignee,
      dueDate: new Date().toISOString(),
    });

    setTitle("");
    setAssignee("");
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("taskId");
    if (!id) return;
    updateTaskStatus(id, newStatus);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const renderColumn = (colStatus: Status, title: string) => {
    const columnTasks = filteredTasks.filter(
      (t) => t.status === colStatus
    );

    return (
      <div
        onDrop={(e) => handleDrop(e, colStatus)}
        onDragOver={handleDragOver}
        className="bg-white p-4 rounded-2xl shadow-lg border min-h-[350px]"
      >
        <h2 className="font-bold mb-3 text-gray-700">
          {title} ({columnTasks.length})
        </h2>

        {columnTasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            className="p-4 mb-3 bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-grab"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{task.title}</span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === "low"
                    ? "bg-green-100 text-green-600"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : task.priority === "high"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {task.priority}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold">
                {getAvatar(task.assignee)}
              </div>

              <span className="text-sm text-gray-600">
                {task.assignee || "Unassigned"}
              </span>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="mt-2 text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">
        🚀 Task Manager Dashboard
      </h1>

      <div className="mb-4 flex flex-wrap gap-3">
        <button onClick={() => setView("kanban")} className="px-4 py-2 rounded-lg bg-white shadow">
          Kanban
        </button>
        <button onClick={() => setView("list")} className="px-4 py-2 rounded-lg bg-white shadow">
          List
        </button>
      </div>

      <div className="mb-6 p-5 bg-white rounded-2xl shadow-lg border">
        <h2 className="font-semibold mb-3">Add Task</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <input placeholder="Task title..." className="px-3 py-2 border rounded-lg" value={title} onChange={(e) => setTitle(e.target.value)} />

          <input placeholder="Assignee..." className="px-3 py-2 border rounded-lg" value={assignee} onChange={(e) => setAssignee(e.target.value)} />

          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="px-3 py-2 border rounded-lg">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="px-3 py-2 border rounded-lg">
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>

          <button onClick={handleAddTask} className="bg-black text-white px-4 py-2 rounded-lg">
            Add
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input placeholder="Search..." className="px-3 py-2 border rounded-lg flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)} className="px-3 py-2 border rounded-lg">
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {view === "kanban" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderColumn("todo", "Todo")}
          {renderColumn("inprogress", "In Progress")}
          {renderColumn("review", "Review")}
          {renderColumn("done", "Done")}
        </div>
      )}

      {view === "list" && (
        <div className="bg-white rounded-xl shadow overflow-y-auto" style={{ height: 400 }} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
          <div style={{ height: filteredTasks.length * ROW_HEIGHT, position: "relative" }}>
            {visibleTasks.map((task, i) => {
              const index = startIndex + i;

              return (
                <div
                  key={task.id}
                  style={{ position: "absolute", top: index * ROW_HEIGHT, left: 0, right: 0 }}
                  className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border-b gap-2"
                >
                  <div>{task.title}</div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm">
                      {getAvatar(task.assignee)}
                    </div>
                    {task.assignee}
                  </div>

                  <div>{task.priority}</div>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(task.id, e.target.value as Status)
                    }
                  >
                    <option value="todo">Todo</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>

                  <button onClick={() => deleteTask(task.id)} className="text-red-500">
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;