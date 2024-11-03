import { editTask, completedTask, deleteTask } from "./editDeleteComplete.js";

const eachButtonFunction = (change, operation, index, buttonsDiv) => {
  const button = document.createElement("button");
  button.textContent = change;
  button.id = change;
  buttonsDiv.appendChild(button);
  if (operation === editTask) {
    button.addEventListener("click", () => operation(index));
  } else if (operation === deleteTask) {
    button.addEventListener("click", () => operation(index, "delete"));
  } else {
  }
};

const eachListFunction = (input, taskList, index, div) => {
  const innerDiv = document.createElement("li");
  innerDiv.textContent = `${input} : ${taskList[index][input]}`;
  div.appendChild(innerDiv);
};

export const displayDetails = (taskList, PendingTaskOrCompltedTask) => {
  let taskContainer;
  if (PendingTaskOrCompltedTask === "pendingTask") {
    taskContainer = document.getElementById("taskContainerPending");
  } else {
    taskContainer = document.getElementById("taskContainerCompleted");
  }
  taskContainer.innerHTML = "";

  for (let index = 0; index < taskList.length; index++) {
    const div = document.createElement("div");
    div.id = "mainDiv";
    div.setAttribute("mainDiv", index);

    const title = "title";
    const description = "description";
    const date = "date";
    const priority = "priority";

    eachListFunction(title, taskList, index, div);
    eachListFunction(description, taskList, index, div);
    eachListFunction(date, taskList, index, div);
    eachListFunction(priority, taskList, index, div);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttonsDiv";

    eachButtonFunction("edit", editTask, index, buttonsDiv);
    eachButtonFunction("remove", deleteTask, index, buttonsDiv);
    eachButtonFunction("completed", completedTask, index, buttonsDiv);

    if (PendingTaskOrCompltedTask === "pendingTask") {
      div.appendChild(buttonsDiv);
    }
    taskContainer.appendChild(div);
  }
};
