import { useRouter } from "next/router";
import TaskForm from "@/Components/TaskForm";

export default function CreateTaskPage({ initiatives, onCreateTask }) {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  function handleSubmit(newTask) {
    return onCreateTask(initiativeId, newTask)
  }

  return <TaskForm onSubmit={handleSubmit} initiatives={initiatives} />;
}
