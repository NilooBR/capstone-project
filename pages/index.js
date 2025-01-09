import InitiativeList from "@/Components/InitiativeList/InitiativeList";
import styled from "styled-components";

// const CreateCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   font-size: 16px;
//   border: 1px solid black;
//   border-radius: 10px;
//   height: 150px;
//   width: 100%;
//   cursor: pointer;
// `;

export default function HomePage() {
  return (
    <div>
      {/* <CreateCard>➕Create Initiative</CreateCard> */}
      <InitiativeList />
    </div>
  );
}
