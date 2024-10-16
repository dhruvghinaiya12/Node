let id = null;

const handleForm = async (e) => {
    e.preventDefault();
    
    const taskData = {
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
    };

    if (id === null) {
        await axios.post('http://localhost:4042/', taskData);
    } else {
        await axios.patch(`http://localhost:4042/${id}`, taskData);
        id = null;
        document.getElementById('taskName').removeAttribute('readonly');
    }

    fetchTasks();
    taskForm.reset();
};

document.getElementById("taskForm").addEventListener('submit', handleForm);

// Update tasks list
const editTask = (task) => {
    document.getElementById('taskName').value = task.taskName;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;

    id = task._id;
    document.getElementById('taskName').setAttribute('readonly', 'readonly');
    document.getElementById('submitBtn').textContent = "Update Task";
};

const fetchTasks = async () => {
    const response = await axios.get('http://localhost:4042/');
    document.getElementById('tasksList').innerHTML = '';
    response.data.forEach(task => {
        document.getElementById('tasksList').innerHTML += `
            <div class="card mb-3" id="task-${task._id}">
                <div class="card-body">
                    <h5 class="card-title"><strong>Task:</strong> ${task.taskName}</h5>
                    <p class="card-text"><strong>Description:</strong> ${task.description}</p>
                    <p class="card-text"><strong>Status:</strong> ${task.status}</p>
                    <button id="delete-btn-${task._id}" class="btn btn-danger">Delete</button>
                    <button id="edit-btn-${task._id}" class="btn btn-warning">Edit</button>
                </div>
            </div>
        `;
    });

    response.data.forEach(task => {
        document.getElementById(`delete-btn-${task._id}`).addEventListener('click', () => deleteTask(task._id));
        document.getElementById(`edit-btn-${task._id}`).addEventListener('click', () => editTask(task));
    });
};

const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:4042/${taskId}`);
    fetchTasks();
};

fetchTasks();
