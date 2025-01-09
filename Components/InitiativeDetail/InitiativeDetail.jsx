import styled from "styled-components";

export default function InitiativeDetail({
  title,
  description,
  tags,
  deadline,
}) {
  
  return (
    <>
      <StyledH1>{title}</StyledH1>
      <StyledArticle>{description}</StyledArticle>
      <StyledP>{deadline}</StyledP>
      <StyledDiv>
      {tags.map((tag) => (
         <StyledSpan key={tag}>{tag}</StyledSpan>))}
      </StyledDiv>
    </>
  );
}

const StyledH1 = styled.h1`
  padding-left: 20px;
  margin: 20px 0;
`;
const StyledArticle = styled.article`
  margin: 10px;
  padding: 20px 10px;
  border: solid 1px grey;
  border-radius: 20px;
`;
const StyledP = styled.p`
  margin: 30px 10px;
  padding: 0 10px;
  border: solid 1px grey;
  border-radius: 3px;
`;
const StyledDiv = styled.div`
  padding: 20px 10px;
  display: flex;
  gap: 15px;
`
const StyledSpan = styled.span`
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
`;