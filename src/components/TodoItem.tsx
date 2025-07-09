import { Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type TodoItemProps = {
  todo: Todo;
  onDelete: () => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
};

const TodoItem = ({ todo, onDelete, isSelected, onToggleSelect }: TodoItemProps) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center gap-2">
        <Checkbox checked={isSelected} onCheckedChange={() => onToggleSelect(todo.id)} />
        <span className="text-md font-bold">{todo.text}</span>
        {todo.priority === "Urgente" ? (
          <Badge
            variant={"secondary"}
            className="text-red-500/60 border-red-500/60"
          >
            Urgent
          </Badge>
        ) : null}
        {todo.priority === "Moyenne" ? (
          <Badge
            variant={"secondary"}
            className=" text-yellow-500/60 border-yellow-500/60"
          >
            Moyen
          </Badge>
        ) : null}
        {todo.priority === "Basse" ? (
          <Badge
            variant={"secondary"}
            className=" text-green-500/60 border-green-500/60"
          >
            Bas
          </Badge>
        ) : null}
      </div>

      <Button
        variant={"secondary"}
        size={"icon"}
        className="ml-2 border-red-500/60"
        onClick={onDelete}
      >
        <Trash className="w-4 h-4  text-red-500/60" />
      </Button>
    </div>
  );
};

export default TodoItem;
