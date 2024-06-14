import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/archived-tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className="App">
      <h1>Archived Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Assigned To: {task.assignedTo}</p>
            <p>Created Date: {new Date(task.createdDate).toLocaleDateString()}</p>
            <p>Completed Date: {task.completedDate ? new Date(task.completedDate).toLocaleDateString() : 'N/A'}</p>
            <p>Archived Date: {new Date(task.archivedDate).toLocaleDateString()}</p>
            <p>Comments: {task.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
