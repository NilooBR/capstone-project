import { useRouter } from "next/router";
import CreateTaskForm from "@/Components/CreateTaskForm";

export default function EditTaskPage({ initiatives, onEditInitiative }) {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;
  if (!initiativeId || !taskId) {
    return <p>Loading ...</p>;
  }
  const initiativeToEdit = initiatives.find(
    (initiative) => initiative.id === initiativeId
  );

  const taskToEdit = initiativeToEdit.tasks.find((task) => task.id === taskId);

  if (!taskToEdit) {
    return <p>Task not found!</p>;
  }

  if (!initiativeToEdit) {
    return <h2>Initiative not found</h2>;
  }

  return (
    <CreateTaskForm
      onEditInitiative={onEditInitiative}
      initiatives={initiatives}
      taskToEdit={taskToEdit}
      isEditMode={true}
    />
  );
}
