import { useTaskStore } from "./store/taskStore";

function App() {
  const tasks = useTaskStore((state) => state.tasks);

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "inprogress");
  const reviewTasks = tasks.filter((t) => t.status === "review");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      
      {/* TODO */}
      <div>
        <h2 className="font-bold mb-2">Todo</h2>
        {todoTasks.map((task) => (
          <div key={task.id} className="p-2 mb-2 bg-gray-200 rounded">
            {task.title}
          </div>
        ))}
      </div>

      {/* IN PROGRESS */}
      <div>
        <h2 className="font-bold mb-2">In Progress</h2>
        {inProgressTasks.map((task) => (
          <div key={task.id} className="p-2 mb-2 bg-yellow-200 rounded">
            {task.title}
          </div>
        ))}
      </div>

      {/* REVIEW */}
      <div>
        <h2 className="font-bold mb-2">Review</h2>
        {reviewTasks.map((task) => (
          <div key={task.id} className="p-2 mb-2 bg-blue-200 rounded">
            {task.title}
          </div>
        ))}
      </div>

      {/* DONE */}
      <div>
        <h2 className="font-bold mb-2">Done</h2>
        {doneTasks.map((task) => (
          <div key={task.id} className="p-2 mb-2 bg-green-200 rounded">
            {task.title}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;