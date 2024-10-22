let id = null;

const handleForm = async (e) => {
  e.preventDefault();

  const taskData = {
    taskName: document.getElementById("taskName").value,
    description: document.getElementById("description").value,
    status: document.getElementById("status").value,
  };

  if (id === null) {
    await axios.post("http://localhost:4042/", taskData);
  } else {
    await axios.patch(`http://localhost:4042/${id}`, taskData);
    id = null;
    document.getElementById("submitBtn").textContent = "Add Task";
  }

  fetchTasks();
  taskForm.reset();
};

document.getElementById("taskForm").addEventListener("submit", handleForm);

// Update tasks list
const editTask = (task) => {
  document.getElementById("taskName").value = task.taskName;
  document.getElementById("description").value = task.description;
  document.getElementById("status").value = task.status;

  id = task._id;
  document.getElementById("submitBtn").textContent = "Update Task";
};

const fetchTasks = async () => {
  const response = await axios.get("http://localhost:4042/");
  const head = document.getElementById("head");
  document.getElementById("tasksList").innerHTML = "";
  
  if (response.data.length > 0) {
    head.style.display = "table-header-group";

    response.data.map((task, index) => {
      let statusBadge = "";
      if (task.status === "pending") {
        statusBadge = `<span class="badge bg-danger">Pending</span>`;
      } else if (task.status === "in-progress") {
        statusBadge = `<span class="badge bg-warning text-dark">In Process</span>`;
      } else {
        statusBadge = `<span class="badge bg-success">Completed</span>`;
      }
      document.getElementById("tasksList").innerHTML += `
        <tr >
                <td>#${index + 1}</td>
                <td>${task.taskName}</td>
                <td>${task.description}</td>
                    <td>${statusBadge}</td>
                    <td class="d-flex justify-content-center gap-3">
                    <button id="delete-btn-${
                      task._id
                    }" class="btn btn-danger">Delete</button>
                    <button id="edit-btn-${
                      task._id
                    }" class="btn btn-primary">Edit</button>
            </td>
        `;
    });

    response.data.forEach((task) => {
      document
        .getElementById(`delete-btn-${task._id}`)
        .addEventListener("click", () => deleteTask(task._id));
      document
        .getElementById(`edit-btn-${task._id}`)
        .addEventListener("click", () => editTask(task));
    });
  }
  else{
    head.style.display = "none";
  }
};
const deleteTask = async (taskId) => {
  await axios.delete(`http://localhost:4042/${taskId}`);
  fetchTasks();
};

fetchTasks();
