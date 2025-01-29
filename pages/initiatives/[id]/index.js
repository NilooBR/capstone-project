import InitiativeDetailPage from "@/Components/InitiativeDetailPage";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";

export default function InitiativeDetailsPage() {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  const {
    data: initiative,
    error,
    isLoading,
    mutate,
  } = useSWR(initiativeId ? `/api/initiatives/${initiativeId}` : null);

  if (error) return <p>❌Error loading: {error.message}</p>;
  if (isLoading) return <p>⏳ Fetching...</p>;
  if (!initiative) return <p>Loading...</p>;

  async function handleDeleteInitiative() {
    try {
      await fetch(`/api/initiatives/${initiativeId}`, { method: "DELETE" });
      mutate();
      router.push("/");
    } catch (error) {
      console.error("Error deleting initiative:", error);
    }
  }

  async function handleToggleCompleted() {
    try {
      await fetch(`/api/initiatives/${initiativeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !initiative.isCompleted }),
      });
      mutate();
    } catch (error) {
      console.error("Error toggling initiative completion:", error);
    }
  }

  return (
    <InitiativeDetailPage
      initiativeId={initiative._id}
      onDelete={handleDeleteInitiative}
      onToggleCompleted={handleToggleCompleted}
    />
  );
}

// Styled Components

const StyledLink = styled(Link)`
  text-decoration: none;
`;
