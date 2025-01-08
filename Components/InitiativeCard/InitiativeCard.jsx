import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
`;

export default function InitiativeCard({ title, tags, deadline }) {
  return (
    <>
      <Card>
        <h3>Initiative {title}</h3>
        <div>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <p>Deadline: {deadline}</p>
        <div>
          <button>Update</button>
          <button>Delete</button>
        </div>
      </Card>
    </>
  );
}
