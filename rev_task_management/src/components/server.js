const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

// Sample data for users
let users = [
  {
    user_id: 1,
    email: "admin@example.com",
    password: "adminpassword",
    role: "ADMIN",
    managerid: 2,
    status: "ACTIVE",
    specialization: "Backend",
  },
  {
    user_id: 2,
    email: "manager@example.com",
    password: "managerpassword",
    role: "PROJECT_MANAGER",
    managerid: 1,
    status: "ACTIVE",
    specialization: "Backend",
  },
  {
    user_id: 3,
    email: "member@example.com",
    password: "memberpassword",
    role: "TEAM_MEMBER",
    managerid: 2,
    status: "INACTIVE",
    specialization: "Frontend",
  },
];

let clients = [
  {
    client_id: 1,
    name: "John Doe",
    companyName: "Tech Solutions",
    email: "john.doe@techsolutions.com",
    phone: "+912345678900",
  },
];

// Sample data for projects
let projects = [
  {
    project_id: 1,
    clientid: 1,
    name: "Project Alpha",
    desc: "Description for Project Alpha",
    managerid: 1,
  },
];

let tasks = [
  {
    task_id: 1,
    task_name: "registration page",
    project_id: 1,
    description: "Design the project architecture",
    assigned_to: 1,
    status: "IN_PROGRESS",
  },
  {
    task_id: 2,
    task_name: "login page",
    project_id: 1,
    description: "Implement backend API",
    assigned_to: 2,
    status: "NOT_STARTED",
  },
];

app.use(cors());
app.use(bodyParser.json());

// Middleware to validate numeric fields
const validateNumericFields = (req, res, next) => {
  const { clientid, managerid } = req.body;
  if (
    (clientid && isNaN(Number(clientid))) ||
    (managerid && isNaN(Number(managerid)))
  ) {
    return res.status(400).send({
      message: "clientid and managerid must be numeric.",
    });
  }
  next();
};

// User routes
app.get("/admin/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/admin/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((user) => user.user_id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: "User not found!" });
  }
});

app.post("/admin/registration", (req, res) => {
  const userData = req.body;
  console.log("User data received:", userData);

  users.push({
    ...userData,
    user_id: parseInt(userData.user_id, 10),
    managerid: parseInt(userData.managerid, 10),
  });

  res.status(200).send({ message: "User created successfully!" });
});

app.put("/admin/updateUser/:userid", (req, res) => {
  const userId = parseInt(req.params.userid, 10);
  const updatedUserData = req.body;
  console.log("Update request for user ID:", userId);
  console.log("Updated user data:", updatedUserData);

  const userIndex = users.findIndex((user) => user.user_id === userId);

  if (userIndex === -1) {
    res.status(404).send({ message: "User not found!" });
  } else {
    users[userIndex] = {
      ...users[userIndex],
      ...updatedUserData,
      user_id: userId,
    };
    res.status(200).send({ message: "User updated successfully!" });
  }
});

app.put("/admin/deactivateUser/:userid", (req, res) => {
  const userId = parseInt(req.params.userid, 10);
  console.log("Deactivate request for user ID:", userId);

  const userIndex = users.findIndex((user) => user.user_id === userId);

  if (userIndex === -1) {
    res.status(404).send({ message: "User not found!" });
  } else {
    users[userIndex].status = "INACTIVE";
    res.status(200).send({ message: "User deactivated successfully!" });
  }
});

app.put("/admin/assignRole/:userid", (req, res) => {
  const userId = parseInt(req.params.userid, 10);
  const { role } = req.body;

  const userIndex = users.findIndex((user) => user.user_id === userId);

  if (userIndex === -1) {
    res.status(404).send({ message: "User not found!" });
  } else {
    users[userIndex].role = role;
    res.status(200).send({ message: "Role assigned successfully!" });
  }
});

// Client routes
app.get("/admin/clients", (req, res) => {
  res.status(200).json(clients);
});

app.post("/admin/createClient", (req, res) => {
  const clientData = req.body;
  console.log("Client data received:", clientData);

  clients.push({
    ...clientData,
    client_id: parseInt(clientData.client_id, 10),
  });

  res.status(200).send({ message: "Client created successfully!" });
});

// Project routes
app.get("/admin/projects", (req, res) => {
  res.status(200).json(projects);
});

app.post("/admin/createProject", validateNumericFields, (req, res) => {
  const projectData = req.body;
  console.log("Project data received:", projectData);

  projects.push({
    ...projectData,
    project_id: projects.length
      ? projects[projects.length - 1].project_id + 1
      : 1,
    clientid: Number(projectData.clientid),
    managerid: Number(projectData.managerid),
  });

  res.status(200).send({ message: "Project created successfully!" });
});

app.put(
  "/admin/updateProject/:projectid",
  validateNumericFields,
  (req, res) => {
    const projectId = parseInt(req.params.projectid, 10);
    const updatedProjectData = req.body;
    console.log("Update request for project ID:", projectId);
    console.log("Updated project data:", updatedProjectData);

    const projectIndex = projects.findIndex(
      (project) => project.project_id === projectId
    );

    if (projectIndex === -1) {
      res.status(404).send({ message: "Project not found!" });
    } else {
      projects[projectIndex] = {
        ...projects[projectIndex],
        ...updatedProjectData,
        project_id: projectId,
        clientid: Number(updatedProjectData.clientid),
        managerid: Number(updatedProjectData.managerid),
      };
      res.status(200).send({ message: "Project updated successfully!" });
    }
  }
);

// Tasks
app.get("/admin/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Create a new task
app.post("/admin/createTask", (req, res) => {
  const taskData = req.body;
  console.log("Task data received:", taskData);

  tasks.push({
    ...taskData,
    task_id: tasks.length ? tasks[tasks.length - 1].task_id + 1 : 1,
  });

  res.status(200).send({ message: "Task created successfully!" });
});

// Update a task
app.put("/admin/updateTask/:taskid", (req, res) => {
  const taskId = parseInt(req.params.taskid, 10);
  const updatedTaskData = req.body;
  console.log("Update request for task ID:", taskId);
  console.log("Updated task data:", updatedTaskData);

  const taskIndex = tasks.findIndex((task) => task.task_id === taskId);

  if (taskIndex === -1) {
    res.status(404).send({ message: "Task not found!" });
  } else {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updatedTaskData,
      task_id: taskId,
    };
    res.status(200).send({ message: "Task updated successfully!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
