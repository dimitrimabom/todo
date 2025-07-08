import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");

  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() == "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");

    console.log(newTodos);
  }

  let filteredTodos: Todo[] = [];

  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-card p-5 rounded-2xl">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Ajouter une tâche ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Select
            value={priority}
            onValueChange={(e) => setPriority(e as Priority)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Urgente">Urgente</SelectItem>
              <SelectItem value="Moyenne">Moyenne</SelectItem>
              <SelectItem value="Basse">Basse</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={addTodo}>Ajouter</Button>
        </div>

        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <Button
              className={`${filter === "Tous" ? "text-primary" : ""}`}
              variant={filter === "Tous" ? "secondary" : "outline"}
              onClick={() => {
                setFilter("Tous");
              }}
            >
              Tous
            </Button>
          </div>

          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-sm">{todo.text}</span>
                  <span className="text-xs text-muted-foreground">
                    {todo.priority}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div>2</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
