import { completedTaskList, pendingTaskList } from "./taskLists.js";
import { pendingTaskListToLocalStorage } from "./userForm.js";
import { displayDetails } from "./display.js";

const completedTaskLocalStorage = () => {
  localStorage.setItem("completedTaskList", JSON.stringify(completedTaskList));
};

export let editIndex = null;
const editTask = (index) => {
  editIndex = index;
  document.getElementById("taskTitle").value = pendingTaskList[editIndex].title;
  document.getElementById("taskInfo").value =
    pendingTaskList[editIndex].description;
  document.getElementById("taskDueDate").value =
    pendingTaskList[editIndex].date;
  document.getElementById("taskPriority").value =
    pendingTaskList[editIndex].priority;
};

const deleteTask = (index, deleteOrComplete) => {
  let confirmed;
  if (deleteOrComplete === "delete") {
    confirmed = confirm("Are you sure you want to delete this task?");
  } else {
    confirmed = confirm("Are you sure you completed this task?");
  }
  if (confirmed) {
    pendingTaskList.splice(index, 1);
    pendingTaskListToLocalStorage();
    displayDetails(pendingTaskList, "pendingTask");
  }
};

const completedTask = (index, deleteOrComplete) => {
  const title = pendingTaskList[index].title;
  const description = pendingTaskList[index].description;
  const dueDate = pendingTaskList[index].date;
  const priority = pendingTaskList[index].priority;
  const currentObject = { title, description, dueDate, priority };
  completedTaskList.push(currentObject);
  completedTaskLocalStorage();
  deleteTask(index, deleteOrComplete);
  displayDetails(completedTaskList, "completedTask");
};

export { editTask, deleteTask, completedTask };
