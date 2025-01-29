import InitiativeForm from "@/Components/InitiativeForm";
import { useRouter } from "next/router";

export default function CreateInitiativePage() {
  const router = useRouter();

  async function handleCreateInitiative(newInitiative) {
    const response = await fetch("/api/initiatives/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInitiative),
    });
  
    const data = await response.json();
  
    if (!response.ok || !data.success || !data.data?._id) {
      console.error("Initiative creation failed:", data);
      throw new Error(`Initiative creation failed: ${data.message}`);
    }
  
    router.push(`/initiatives/${data.data._id}`);
  }

  return <InitiativeForm onSubmit={handleCreateInitiative} />;
}
