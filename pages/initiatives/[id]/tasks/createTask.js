import { useRouter } from "next/router";
import TaskForm from "@/Components/TaskForm";

export default function CreateTaskPage() {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  async function handleCreateTask(newTask) {
    const response = await fetch(`/api/initiatives/${initiativeId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Task creation failed ${response.status}`);
    }

    router.push(`/initiatives/${initiativeId}/tasks/${data._id}`);
  }

  if (!initiativeId) return <p>Loading...</p>;

  return <TaskForm onSubmit={handleCreateTask} initiativeId={initiativeId} />;
}
