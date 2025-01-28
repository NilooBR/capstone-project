import InitiativeForm from "@/Components/InitiativeForm";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function CreateInitiativePage() {
  const { mutate } = useSWR("/api/initiatives");
  const router = useRouter();

  async function handleCreateInitiative(newInitiative) {
    const response = await fetch("/api/initiatives", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInitiative),
    });

    if (!response.ok) {
      throw new Error(`Initiative creation failed ${response.status}`);
    }

    await response.json();
    mutate();
    router.push("/");
  }

  return <InitiativeForm onSubmit={handleCreateInitiative} />;
}
