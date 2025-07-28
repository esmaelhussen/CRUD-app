import React from "react";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 ">React CRUD App</h1>
      <TodoList />
    </main>
  );
}

export default App;
