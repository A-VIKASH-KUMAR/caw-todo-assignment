// import React from 'react';

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
function TaskList({ tasks, editTask, deleteTask, toggleTaskCompletion }:TaskListProps) {;
    return (
        <ul>
          {tasks.map((task) => (
            <li key={("link unavailable")}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion((task.id))}
              />
              <span>{task.text}</span>
              <button onClick={() => editTask((task.id), prompt('Edit task:',task.text))}>Edit</button>
              <button onClick={() => deleteTask((task.id))}>Delete</button>
            </li>
          ))}
        </ul>
      );
    }

export default TaskList;