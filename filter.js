import { pendingTaskList, completedTaskList } from "./taskLists.js";
import { displayDetails } from "./display.js";

const filterTasksByDate = (tasks, dateFilter) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours to zero for accurate comparison

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  return tasks.filter((task) => {
    const taskDate = new Date(task.date);

    if (dateFilter === "today") {
      return taskDate.toDateString() === today.toDateString();
    } else if (dateFilter === "week") {
      return taskDate >= today && taskDate <= nextWeek;
    }

    return true; // If filter is "all", return all tasks
  });
};

const filterTasks = () => {
  const priorityFilter = document.getElementById("priorityFilter").value;
  const dateFilter = document.getElementById("dateFilter").value;
  const statusFilter = document.getElementById("statusFilter").value;

  let filteredPendingTasks = [...pendingTaskList];
  let filteredCompletedTasks = [...completedTaskList];

  if (priorityFilter !== "all") {
    filteredPendingTasks = filteredPendingTasks.filter(
      (task) => task.priority === priorityFilter
    );
    filteredCompletedTasks = filteredCompletedTasks.filter(
      (task) => task.priority === priorityFilter
    );
  }

  if (dateFilter !== "all") {
    filteredPendingTasks = filterTasksByDate(filteredPendingTasks, dateFilter);
    filteredCompletedTasks = filterTasksByDate(
      filteredCompletedTasks,
      dateFilter
    );
  }

  if (statusFilter === "pending") {
    filteredCompletedTasks = [];
  } else if (statusFilter === "completed") {
    filteredPendingTasks = [];
  }
  // console.log("Filtered Pending Tasks:", filteredPendingTasks);
  // console.log("Filtered Completed Tasks:", filteredCompletedTasks);
  displayDetails(filteredPendingTasks, "pendingTask");
  displayDetails(filteredCompletedTasks, "completedTask");
  return;
};

export default filterTasks;
