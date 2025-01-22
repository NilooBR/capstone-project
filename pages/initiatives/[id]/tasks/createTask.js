import TaskForm from "@/Components/TaskForm";

export default function CreateTaskPage({ initiatives, onEditInitiative }) {
  function handleCreateTask(updatedInitiative) {
    onEditInitiative(updatedInitiative);
  }

  return <TaskForm onSubmit={handleCreateTask} initiatives={initiatives} />;
}
