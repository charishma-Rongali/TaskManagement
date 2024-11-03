import { pendingTaskList } from "./taskLists.js";
import { displayDetails } from "./display.js";

export const pendingTaskListToLocalStorage = () => {
  localStorage.setItem("pendingTaskList", JSON.stringify(pendingTaskList));
};

export const userFormSubmit = (event, editIndex) => {
  event.preventDefault();
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskInfo").value;
  const date = document.getElementById("taskDueDate").value;
  const priority = document.getElementById("taskPriority").value;
  if (title === "" || description === "" || date === "" || priority === "") {
    alert("please fill all the details");
    return;
  }
  if (editIndex === null) {
    const currentObject = { title, description, date, priority };
    pendingTaskList.push(currentObject);
  } else {
    console.log("i am here", editIndex);
    pendingTaskList[editIndex].title = title;
    pendingTaskList[editIndex].description = description;
    pendingTaskList[editIndex].date = date;
    pendingTaskList[editIndex].priority = priority;
    editIndex = null;
  }
  pendingTaskListToLocalStorage();
  document.getElementById("userForm").reset();
  displayDetails(pendingTaskList, "pendingTask");
  console.log(pendingTaskList);
};
