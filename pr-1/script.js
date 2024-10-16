const handleForm = async (e) => {
    e.preventDefault(); 
    
    const taskData = {
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
    };

    await axios.post('http://localhost:4042/', taskData);

    fetchTasks(); 
    taskForm.reset();
};

document.getElementById("taskForm").addEventListener('submit', handleForm);

const fetchTasks = async () => {
    const response = await axios.get('http://localhost:4042/'); 
    document.getElementById('tasksList').innerHTML = '';
    response.data.map(task => {
        document.getElementById('tasksList').innerHTML += `
            <div class="card mb-3" id="task-${task._id}">
                <div class="card-body">
                    <h5 class="card-title"><strong>Task:</strong> ${task.taskName}</h5>
                    <p class="card-text"><strong>Description:</strong> ${task.description}</p>
                    <p class="card-text"><strong>Status:</strong> ${task.status}</p>
                    <button id="delete-btn-${task._id}" class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;
    });

    response.data.forEach(task => {
        const deleteButton = document.getElementById(`delete-btn-${task._id}`);
        deleteButton.addEventListener('click', () => {
            deleteTask(task._id);
        });
    });
};

const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:4042/${taskId}`);
    fetchTasks(); 
};

fetchTasks();
