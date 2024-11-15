import { useState } from 'react';
import AddTask from './task/AddTask';
import { Task } from './task/TaskList';
import TaskList from './task/TaskList';
import FilterTasks from './task/FilterTask';
import './index.css'
function TodoApp(useFilter="all") {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(useFilter);

  const addTask = (task:Array<object>) => {
    setTasks([...tasks, { id: tasks.length + 1, text: task, completed: false }]);
  };

  const editTask = (id:number, text:string) => {
    setTasks(tasks.map((task:Task) => ((task.id) === id ? { ...task, text } : task)));
  };

  const deleteTask = (id:number) => {
    setTasks(tasks.filter((task:Task) => (task.id) !== id));
  };

  const toggleTaskCompletion = (id:number) => {
    setTasks(tasks.map((task:Task) => ((task.id) === id ? { ...task, completed: !task.completed } : task)));
  };

  const filterTasks = (filter:string) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
  });

  return (
    <div>
      <AddTask addTask={addTask} />
      <TaskList tasks={filteredTasks} editTask={editTask} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />
      <FilterTasks filterTasks={filterTasks} />
    </div>
  );
}

export default TodoApp;