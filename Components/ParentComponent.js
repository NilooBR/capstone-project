import React from "react";
import InitiativeList from "./InitiativeList";

const ParentComponent = ({ initiatives }) => {
  // Split initiatives into "open" and "completed"
  const openInitiatives = initiatives.filter(
    (initiative) => !initiative.completed
  );
  const completedInitiatives = initiatives.filter(
    (initiative) => initiative.completed
  );

  // Sorting logic
  const sortByDeadline = (a, b) => new Date(a.deadline) - new Date(b.deadline);

  // Sort both lists
  const sortedOpenInitiatives = [...openInitiatives].sort(sortByDeadline);
  const sortedCompletedInitiatives = [...completedInitiatives].sort(
    sortByDeadline
  );

  return (
    <div>
      <h2>Open Initiatives</h2>
      <InitiativeList initiatives={sortedOpenInitiatives} />

      <h2>Completed Initiatives</h2>
      <InitiativeList initiatives={sortedCompletedInitiatives} />
    </div>
  );
};

export default ParentComponent;
