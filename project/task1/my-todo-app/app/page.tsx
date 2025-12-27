'use client';
import { useState, useEffect } from 'react';

// Define what a "Todo" looks like for TypeScript
interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  // Tell useState that 'todos' is an array of Todo objects
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = async () => {
    if (!input) return;
    
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input }),
    });

    const newTodo: Todo = await res.json();
    setTodos([...todos, newTodo]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-black">My Project Tasks</h1>
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 flex-grow rounded text-black"
            placeholder="Add a new task..."
          />
          <button 
            onClick={addTodo} 
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo._id} className="border-b p-2 text-gray-800">
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}