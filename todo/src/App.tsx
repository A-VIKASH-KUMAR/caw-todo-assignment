import React, { useState } from 'react';
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

  const addTask = (text: string) => {
    setTasks([...tasks, { id: tasks.length + 1, text, completed: false }]);
  };

  const editTask = (id: number, text: string) => {
    setTasks(tasks.map((task) => ((task.id) === id ? { ...task, text } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => (task.id) !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => ((task.id) === id ? { ...task, completed: !task.completed } : task)));
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
    <div className="container">
      <AddTask addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
      <FilterTasks filterTasks={filterTasks} />
    </div>
  );
}

export default TodoApp;