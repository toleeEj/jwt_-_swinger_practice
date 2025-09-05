"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) router.push("/login");
    else fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("todos/");
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title) return;
    try {
      await API.post("todos/", newTodo);
      setNewTodo({ title: "", description: "" });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      await API.put(`todos/${id}/`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await API.delete(`todos/${id}/`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <Navbar />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">
        My Todo List
      </h1>

      {/* Add Todo Form */}
      <form
        onSubmit={handleAddTodo}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Todo Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Todo List */}
      <ul className="w-full max-w-2xl space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-1">
                <h2
                  className={`text-lg font-semibold ${
                    todo.completed ? "line-through text-gray-400" : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </h2>
                {todo.description && (
                  <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(todo.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                    todo.completed
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}