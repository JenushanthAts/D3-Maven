import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { customerService } from "services/customerService";

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNo: "",
    userRole: "",
  });
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await customerService.createCustomer(userData);
      res && navigate("/view-customers");
    } catch (err) {
      return err;
    }
  };
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                onChange={handleOnChange}
                value={userData.fullName}
                placeholder="Enter Full name"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={userData.email}
                name="email"
                onChange={handleOnChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleOnChange}
                value={userData.password}
                placeholder="Password"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile no</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="mobileNo"
                value={userData.mobileNo}
                onChange={handleOnChange}
                placeholder="Mobile number"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select user role</Form.Label>
              <Form.Select
                value={userData.userRole}
                name="userRole"
                onChange={handleOnChange}
                required
              >
                <option value="">-- Select an Option --</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCustomer;
