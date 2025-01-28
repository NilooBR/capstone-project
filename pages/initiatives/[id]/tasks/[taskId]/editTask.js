import { useRouter } from "next/router";
import TaskForm from "@/Components/TaskForm";
import useSWR from "swr";

export default function EditTaskPage() {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;

  const { data: initiatives, mutate } = useSWR("/api/initiatives");

  const initiativeToEdit = initiatives?.find(
    (initiative) => initiative._id === initiativeId
  );
  const taskToEdit = initiativeToEdit?.tasks.find(
    (task) => task._id === taskId
  );

  if (!initiativeToEdit) {
    return <h2>Initiative not found</h2>;
  }

  if (!taskToEdit) {
    return <h2>Task not found</h2>;
  }

  async function handleEditTask(updatedTask) {
    const response = await fetch(
      `/api/initiatives/${initiativeId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      }
    );

    if (!response.ok) {
      throw new Error(`Edit failed ${response.status}`);
    }

    await response.json();
    mutate();
    router.push(`/initiatives/${initiativeId}`);
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
