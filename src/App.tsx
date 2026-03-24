import { useState } from "react";
import { useTaskStore } from "./store/taskStore";

function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const addTask = useTaskStore((state) => state.addTask);

  // search + filter
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // add task form
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("todo");

  // filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchSearch && matchPriority;
  });

  // add task
  const handleAddTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      status: status as any,
      priority: priority as any,
      assignee: "You",
      dueDate: new Date().toISOString(),
    };

    addTask(newTask);
    setTitle("");
  };

  // drag start
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id);
  };

  // drop
  const handleDrop = (e: React.DragEvent, status: string) => {
    const id = e.dataTransfer.getData("taskId");
    updateTaskStatus(id, status as any);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // column render
  const renderColumn = (status: string, title: string, color: string) => {
    const columnTasks = filteredTasks.filter((t) => t.status === status);

    return (
      <div
        onDrop={(e) => handleDrop(e, status)}
        onDragOver={handleDragOver}
        className="p-3 bg-gray-100 rounded min-h-[300px]"
      >
        <h2 className="font-bold mb-2">{title}</h2>

        {columnTasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            className={`p-2 mb-2 rounded cursor-move ${color}`}
          >
            {task.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">

      {/* ADD TASK */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="New task..."
          className="border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border p-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={handleAddTask}
          className="bg-black text-white px-4"
        >
          Add
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="border p-2 mb-3 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <select
        className="border p-2 mb-4"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      {/* BOARD */}
      <div className="grid grid-cols-4 gap-4">
        {renderColumn("todo", "Todo", "bg-gray-200")}
        {renderColumn("inprogress", "In Progress", "bg-yellow-200")}
        {renderColumn("review", "Review", "bg-blue-200")}
        {renderColumn("done", "Done", "bg-green-200")}
      </div>
    </div>
  );
}

export default App;