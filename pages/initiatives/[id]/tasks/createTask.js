import { useRouter } from "next/router";
import TaskForm from "@/Components/TaskForm";
import useSWR from "swr";

export default function CreateTaskPage() {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  const { data: initiatives, mutate } = useSWR("/api/initiatives");

  async function handleCreateTask(newTask) {
    const response = await fetch(`/api/initiatives/${initiativeId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    
    if (!response.ok) {
      throw new Error(`Task creation failed ${response.status}`);
    }

    await response.json();
    mutate();
    router.push(`/initiatives/${initiativeId}`);
  }

  if (!initiativeId) return <p>Loading...</p>;

  return <TaskForm onSubmit={handleCreateTask} initiativeId={initiativeId} />;
}
