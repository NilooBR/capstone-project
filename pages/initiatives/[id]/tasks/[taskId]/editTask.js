import { useRouter } from "next/router";
import TaskForm from "@/Components/TaskForm";
import useSWR from "swr";

export default function EditTaskPage() {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;

  const {
    data: taskToEdit,
    error,
    isLoading,
  } = useSWR(
    initiativeId && taskId
      ? `/api/initiatives/${initiativeId}/tasks/${taskId}`
      : null
  );

  if (error) return <p>❌ Error loading: {error.message}</p>;
  if (isLoading) return <p>⏳ Fetching...</p>;
  if (!taskToEdit) return <h2>Task not found</h2>;

  async function handleEditTask(updatedTask) {
    try {
      const response = await fetch(
        `/api/initiatives/${initiativeId}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error(`Edit failed: ${response.status}`);
      }

      router.push(`/initiatives/${initiativeId}/tasks/${taskId}`);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  return (
    <TaskForm
      onSubmit={handleEditTask}
      initiativeId={initiativeId}
      task={taskToEdit}
      isEditMode
    />
  );
}
