import { useState } from "react";
import { useTaskStore } from "./store/taskStore";
import { FixedSizeList as List } from "react-window";

function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const addTask = useTaskStore((state) => state.addTask);

  // view
  const [view, setView] = useState("kanban");

  // search + filter
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // add task
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("todo");

  // sorting
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // filter
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchSearch && matchPriority;
  });

  // sort
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let valueA: any = a[sortField as keyof typeof a];
    let valueB: any = b[sortField as keyof typeof b];

    if (sortField === "dueDate") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
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

  // drag
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    const id = e.dataTransfer.getData("taskId");
    updateTaskStatus(id, status as any);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // inline status change
  const handleStatusChange = (id: string, status: string) => {
    updateTaskStatus(id, status as any);
  };

  // kanban column
  const renderColumn = (status: string, title: string, color: string) => {
    const columnTasks = filteredTasks.filter((t) => t.status === status);

    return (
      <div
        onDrop={(e) => handleDrop(e, status)}
        onDragOver={handleDragOver}
        className="p-3 bg-gray-100 rounded min-h-[300px]"
      >
        <h2 className="font-bold mb-2">
          {title} ({columnTasks.length})
        </h2>

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

      {/* VIEW SWITCH */}
      <div className="mb-4 flex gap-2">
        <button onClick={() => setView("kanban")} className="border px-3">
          Kanban
        </button>
        <button onClick={() => setView("list")} className="border px-3">
          List
        </button>
      </div>

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

        <button onClick={handleAddTask} className="bg-black text-white px-4">
          Add
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
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

      {/* KANBAN */}
      {view === "kanban" && (
        <div className="grid grid-cols-4 gap-4">
          {renderColumn("todo", "Todo", "bg-gray-200")}
          {renderColumn("inprogress", "In Progress", "bg-yellow-200")}
          {renderColumn("review", "Review", "bg-blue-200")}
          {renderColumn("done", "Done", "bg-green-200")}
        </div>
      )}

      {/* LIST WITH VIRTUAL SCROLL */}
      {view === "list" && (
        <div style={{ height: "400px" }}>
          <List
            height={400}
            itemCount={sortedTasks.length}
            itemSize={60}
            width="100%"
          >
            {({ index, style }) => {
              const task = sortedTasks[index];

              return (
                <div
                  style={style}
                  className="flex justify-between items-center border-b px-4"
                >
                  <div>{task.title}</div>
                  <div>{task.priority}</div>
                  <div>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="todo">Todo</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              );
            }}
          </List>
        </div>
      )}

    </div>
  );
}

export default App;