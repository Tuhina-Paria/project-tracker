import { tasks } from "./utils/data";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        Total Tasks: {tasks.length}
      </h1>
    </div>
  );
}

export default App;