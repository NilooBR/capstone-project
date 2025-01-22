import { useState, useEffect } from "react";

export function useTaskState(initiativeId, taskId, initiatives) {
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (initiativeId && taskId) {
      const selectedInitiative = initiatives.find(
        (initiative) => initiative.id === initiativeId
      );

      if (selectedInitiative) {
        const selectedTask = selectedInitiative.tasks?.find(
          (item) => item.id == taskId
        );

        if (selectedTask) {
          setTask(selectedTask);
          setStatus(selectedTask.status);
        }
      }
    }
  }, [initiativeId, taskId, initiatives]);

  function updateTaskStatus(newStatus, onUpdateInitiatives){
    setStatus(newStatus);

    const updatedInitiatives = initiatives.map((initiative) => {
      if (initiative.id === initiativeId) {
        return {
          ...initiative,
          tasks: initiative.tasks.map((task) =>
            task.id == taskId ? { ...task, status: newStatus } : task
          ),
        };
      }
      return initiative;
    });

    onUpdateInitiatives(updatedInitiatives);
  };

  return { task, status, updateTaskStatus };
}
