import styled from "styled-components";
import Link from "next/link";

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 150px;
  width: 100%;
`;

const TagList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  list-style: none;
`;

const Tag = styled.li`
  background: #a8a8a8;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  text-align: center;
`;

const DateText = styled.p`
  text-align: center;
  margin: 10px;
  font-size: 11px;
`;

export default function InitiativeCard({ id, title, tags, deadline}) {
  return (
    <Card>
      <StyledLink href={`/initiatives/${id}`}>
        <h3>{title}</h3>
        <TagList>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
        <DateText>{deadline}</DateText>
      </StyledLink>
    </Card>
  );
}
