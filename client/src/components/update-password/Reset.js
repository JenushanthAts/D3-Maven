import { RecoveryContext } from "context/recoveryContext";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Reset = () => {
  const { setPage, password, setPassword } = useContext(RecoveryContext);
  const [error, setError] = useState(null);
  const handleOnChange = (e) => {
    setError(null);
    let { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (password.newPassword !== password.confirmPassword) {
      setError("Password fields does not match");
    } else if (!password.newPassword.match(lowerCase)) {
      setError("Password should contains lowercase letters!");
    } else if (!password.newPassword.match(upperCase)) {
      setError("Password should contain uppercase letters!");
    } else if (!password.newPassword.match(numbers)) {
      setError("Password should contains numbers also!");
    } else if (password.newPassword.length < 8) {
      setError("Password minimum length equal to 8.");
    } else {
      setPage("otp");
    }
  };
  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <p className="h4 text-center">Please Update your Password</p>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                required
                onChange={handleOnChange}
                value={password.newPassword}
                placeholder="Enter Password"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={password.confirmPassword}
                name="confirmPassword"
                onChange={(e) => {
                  let name = "confirmPassword";
                  setPassword({ ...password, [name]: e.target.value });
                }}
                placeholder="Enter Password"
                required
              />
            </Form.Group>
          </Col>
          <small style={{ color: "red" }}>
            Password should contains uppercase,lowercase and numbers and minimum
            length is 8
          </small>
        </Row>
        <div className="mt-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>

        {error && (
          <Col xs={12}>
            <p className="h5 text-center" style={{ color: "red" }}>
              {error}
            </p>
          </Col>
        )}
      </Form>
    </Container>
  );
};

export default Reset;
