import { AuthContext } from "context/authContext";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={12}>
          <p className="h4 text-center">Welcome {user.fullName}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
