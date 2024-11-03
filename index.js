import { pendingTaskList, completedTaskList } from "./taskLists.js";
import filterTasks from "./filter.js";
import { displayDetails } from "./display.js";
import { userFormSubmit } from "./userForm.js";
import { editIndex } from "./editDeleteComplete.js";

window.onload = () => {
  const storedtasks1 = localStorage.getItem("pendingTaskList");
  const storedtasks2 = localStorage.getItem("completedTaskList");
  if (storedtasks1) {
    pendingTaskList.push(...JSON.parse(storedtasks1));
  }
  if (storedtasks2) {
    completedTaskList.push(...JSON.parse(storedtasks2));
  }
  displayDetails(pendingTaskList, "pendingTask");
  displayDetails(completedTaskList, "completedTask");
};

document
  .getElementById("priorityFilter")
  .addEventListener("change", filterTasks);
document.getElementById("dateFilter").addEventListener("change", filterTasks);
document.getElementById("statusFilter").addEventListener("change", filterTasks);

document
  .getElementById("userForm")
  .addEventListener("submit", (event) => userFormSubmit(event, editIndex));
