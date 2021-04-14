import React from "react";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);


export default Section;
