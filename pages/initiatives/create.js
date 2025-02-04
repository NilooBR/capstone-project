import InitiativeForm from "@/Components/InitiativeForm";
import { useRouter } from "next/router";

export default function CreateInitiativePage() {
  const router = useRouter();

  async function handleCreateInitiative(newInitiative) {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/initiatives/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newInitiative),
    });

    const data = await response.json();

    if (!response.ok || !data.success || !data.data?._id) {
      console.error("Initiative creation failed:", data);
      alert(`Initiative creation failed: ${data.message}`);
      return;
    }

    router.push(`/initiatives/${data.data._id}`);
  }

  return <InitiativeForm onSubmit={handleCreateInitiative} />;
}