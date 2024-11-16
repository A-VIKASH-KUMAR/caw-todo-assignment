import React, {useState} from 'react';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
export interface TaskListProps {
    tasks: Task[];
    editTask: (id: number, text: string) => void;
    deleteTask: (id: number) => void;
    toggleTaskCompletion: (id: number) => void;
  }
  function TaskList({ tasks, editTask, deleteTask, toggleTaskCompletion }: TaskListProps) {
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editTaskText, setEditTaskText] = useState('');
  
    return (
      <ul>
        {tasks.map((task) => (
          <li key={(task.id)}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion((task.id))}
              />
              {editingTaskId === (task.id) ? (
                <input
                  type="text"
                  placeholder="Edit task:"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  onBlur={() => {
                    editTask((task.id), editTaskText);
                    setEditingTaskId(null);
                  }}
                />
              ) : (
                <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              )}
              <button
                onClick={() => {
                  if (editingTaskId === (task.id)) {
                    editTask((task.id), editTaskText);
                    setEditingTaskId(null);
                  } else {
                    setEditingTaskId((task.id));
                    setEditTaskText(task.text);
                  }
                }}
              >
                {editingTaskId === (task.id) ? 'Save' : 'Edit'}
              </button>
              <button onClick={() => deleteTask((task.id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
export default TaskList