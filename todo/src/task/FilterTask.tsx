import React from 'react';

function FilterTasks({ filterTasks }) {
  return (
    <div>
      <button onClick={() => filterTasks('all')}>All</button>
      <button onClick={() => filterTasks('completed')}>Completed</button>
      <button onClick={() => filterTasks('pending')}>Pending</button>
    </div>
  );
}

export default FilterTasks;