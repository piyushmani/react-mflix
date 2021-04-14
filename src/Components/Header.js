import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: ${props => (props.theme =='light' ? "white" : "black")};
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Button = styled.button`
  background: ${props => (props.theme =='light' ? "black" : "white")};
  color: ${props => (props.theme =='light' ? "white" : "black")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border:none;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({history, ...props}) => 
  (
  <Header theme={props.themeToggler.currentTheme}>
    <List>
      <Item current={props.location.pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={props.location.pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={props.location.pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
    <Button theme={props.themeToggler.currentTheme} onClick={props.themeToggler.themeToggler} >
    {props.themeToggler.currentTheme =='light' ? "Dark Theme" : "Light Theme"}
    </Button>
    {/* <button onClick={props.themeToggler.themeToggler} >
    {props.themeToggler.currentTheme =='light' ? "Dark Theme" : "Light Theme"}
    </button> */}
  </Header>
));
