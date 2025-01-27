import { useRouter } from "next/router";
import TaskForm from "@/Components/TaskForm";

export default function EditTaskPage({ initiatives, onEditInitiative }) {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;

  if (!initiativeId || !taskId) {
    return <p>Loading ...</p>;
  }

  const initiativeToEdit = initiatives.find(
    (initiative) => initiative.id === initiativeId
  );

  const taskToEdit = initiativeToEdit?.tasks.find((task) => task.id === taskId);

  if (!initiativeToEdit) {
    return <h2>Initiative not found</h2>;
  }

  if (!taskToEdit) {
    return <p>Task not found!</p>;
  }

  function handleEditTask(updatedInitiative) {
    onEditInitiative(updatedInitiative);
  }

  return (
    <TaskForm
      onSubmit={handleEditTask}
      initiatives={initiatives}
      taskToEdit={taskToEdit}
      isEditMode={true}
    />
  );
}
