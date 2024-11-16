import React from 'react';

function AddTask({ addTask }) {
  const [task, setTask] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() === '') {
      alert('Please enter a task');
      return;
    }
    addTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
       <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;