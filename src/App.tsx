import { useTaskStore } from "./store/taskStore";

function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

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

  const renderColumn = (status: string, title: string, color: string) => (
    <div
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={handleDragOver}
      className="p-2 bg-gray-100 rounded min-h-[300px]"
    >
      <h2 className="font-bold mb-2">{title}</h2>

      {tasks
        .filter((t) => t.status === status)
        .map((task) => (
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

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {renderColumn("todo", "Todo", "bg-gray-200")}
      {renderColumn("inprogress", "In Progress", "bg-yellow-200")}
      {renderColumn("review", "Review", "bg-blue-200")}
      {renderColumn("done", "Done", "bg-green-200")}
    </div>
  );
}

export default App;