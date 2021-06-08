import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  margin-top: 132px;
`;

const GoSignUp = () => {
  return (
    <Styles>
      <Container>
        <Row>
          <Col>
            <Nav.Link as={Link} to='/signUp'>
              Please signUp
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default GoSignUp;
