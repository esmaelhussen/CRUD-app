import React, { useEffect, useState } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../api/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTodos = async () => {
    const res = await getAll();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    const res = await createItem({ title: newTodo, completed: false });
    setTodos((prev) => [...prev, res.data]);
    setNewTodo("");
  };

  const handleUpdate = async (id) => {
    const res = await updateItem(id, { title: editText, completed: false });
    setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex gap-2">
        <Input
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={handleCreate}>Add</Button>
      </div>

      {todos.map((todo) => (
        <Card key={todo.id} className="flex items-center justify-between p-4">
          {editingId === todo.id ? (
            <div className="flex gap-2 w-full">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <Button onClick={() => handleUpdate(todo.id)}>Save</Button>
              <Button variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <span>{todo.title}</span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.title);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}
