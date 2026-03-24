import { useTaskStore } from "./store/taskStore";

function App() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="p-4">
      <h1>Total Tasks: {tasks.length}</h1>
    </div>
  );
}

export default App;