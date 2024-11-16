import React, { useState, useEffect } from 'react';
import AddTask from './task/AddTask';
import TaskList from './task/TaskList';
import FilterTasks from './task/FilterTask';
import styles from './App.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  useFilter?: string;
}

function TodoApp({ useFilter }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState(useFilter || 'all');
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = () => {
    const task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const editTask = (id:number, text:string) => {
    const updatedTasks = tasks.map((task) =>
      (task.id) === id ? { ...task, text } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const deleteTask = (id:number) => {
    const updatedTasks = tasks.filter((task) => (task.id) !== id);
    setTasks(updatedTasks);
  };

 const toggleTaskCompletion = (id:number) => {
    const updatedTasks = tasks.map((task) =>
      (task.id) === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filterTasks = (filter: string) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div>
      <form>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="button" onClick={addTask}>
          Add Task
        </button>
      </form>
      <ul>
        {filteredTasks.map((task) => (
          <li key={(task.id)}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion((task.id))}
            />
            {editingTaskId === (task.id) ? (
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  placeholder="Edit task:"
                  onBlur={() => editTask((task.id), editTaskText)}
                />
              </div>
            ) : (
              <div>
  {editingTaskId === (task.id) ? (
    <div>
      <input
        type="text"
        value={editTaskText}
        onChange={(e) => setEditTaskText(e.target.value)}
        placeholder="Edit task:"
        onBlur={() => editTask((task.id), editTaskText)}
      />
    </div>
  ) : (
    <div>
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      >
        {task.text}
      </span>
      <div>
        <button onClick={() => deleteTask((task.id))}>Delete</button>
        <button
          onClick={() => {
            setEditingTaskId((task.id));
            setEditTaskText(task.text);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  )}
</div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
    </div>
  );
};

export default TodoApp;