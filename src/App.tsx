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
import TodoItem from "./components/TodoItem";
import { Construction } from "lucide-react";

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

  const urgentCount = todos.filter(
    (todo) => todo.priority === "Urgente"
  ).length;
  const mediumCount = todos.filter(
    (todo) => todo.priority === "Moyenne"
  ).length;
  const lowCount = todos.filter((todo) => todo.priority === "Basse").length;
  const totalCount = todos.length;

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  function toggleSelectedTodo(id: number) {
    const newSelected = new Set(selectedTodos);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTodos(newSelected);
  }

  function finishedSelected() {
    const newTodos = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false;
      }
      return true;
    });
    setTodos(newTodos);
    setSelectedTodos(new Set());
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

            <Button onClick={addTodo} className=" text-accent-foreground">
              Ajouter
            </Button>
          </div>

          <div className="space-y-2 flex-1 h-fit">
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-4">
                <Button
                  className={`${filter === "Tous" ? "text-primary" : ""}`}
                  variant={filter === "Tous" ? "secondary" : "outline"}
                  onClick={() => {
                    setFilter("Tous");
                  }}
                >
                  Tous ({totalCount})
                </Button>
                <Button
                  className={`${filter === "Moyenne" ? "text-primary" : ""}`}
                  variant={filter === "Moyenne" ? "secondary" : "outline"}
                  onClick={() => {
                    setFilter("Moyenne");
                  }}
                >
                  Moyenne ({mediumCount})
                </Button>
                <Button
                  className={`${filter === "Basse" ? "text-primary" : ""}`}
                  variant={filter === "Basse" ? "secondary" : "outline"}
                  onClick={() => {
                    setFilter("Basse");
                  }}
                >
                  Basse ({lowCount})
                </Button>
                <Button
                  className={`${filter === "Urgente" ? "text-primary" : ""}`}
                  variant={filter === "Urgente" ? "secondary" : "outline"}
                  onClick={() => {
                    setFilter("Urgente");
                  }}
                >
                  Urgente ({urgentCount})
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  disabled={selectedTodos.size === 0}
                  className="text-primary/60 border-primary/60"
                  onClick={finishedSelected}
                >
                  Finir les tâches ({selectedTodos.size})
                </Button>
              </div>
            </div>

            {filteredTodos.length > 0 ? (
              <ul className="divide-y divide-primary/20">
                {filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem
                      todo={todo}
                      isSelected={selectedTodos.has(todo.id)}
                      onDelete={() => deleteTodo(todo.id)}
                      onToggleSelect={toggleSelectedTodo}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center flex-col p-5">
                <div>
                  <Construction
                    strokeWidth={1}
                    className="w-40 h-40 text-primary"
                  />
                </div>
                <p className="text-primary/60 text-lg font-semibold">
                  Aucune tâche trouvée
                </p>
                <p className="text-primary/60 text-sm">
                  Ajoutez une tâche pour commencer
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default App;
