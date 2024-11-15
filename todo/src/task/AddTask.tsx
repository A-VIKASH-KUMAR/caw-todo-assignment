import React from 'react';

function AddTask({ addTask }) {
  const [task, setTask] = React.useState('');

  const handleSubmit = (event:any) => {
    console.log("event", event)
    event.preventDefault();
    addTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={(event) => setTask(event.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;