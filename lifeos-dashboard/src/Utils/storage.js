// USER

export const saveUser = (user) => {
  localStorage.setItem(
    "registeredUser",
    JSON.stringify(user)
  );
};

export const getUser = () => {
  return JSON.parse(
    localStorage.getItem("registeredUser")
  );
};

// LOGIN

export const loginUser = () => {
  localStorage.setItem("isLoggedIn", "true");
};

export const logoutUser = () => {
  localStorage.removeItem("isLoggedIn");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn");
};

// TASKS

export const saveTasks = (tasks) => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
};

export const getTasks = () => {
  return JSON.parse(
    localStorage.getItem("tasks")
  ) || [];
};