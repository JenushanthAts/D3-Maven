import { AuthContext } from "context/authContext";
import { RecoveryContext } from "context/recoveryContext";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { customerService } from "services/customerService";

const OTPINput = () => {
  const { setPage, password, otp, setOTP } = useContext(RecoveryContext);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = { email: user.email, otp: otp, ...password };
      await customerService.updatePassword(data);
      setPage("recovered");
    } catch (err) {
      setError(err.message);
      return err;
    }
  };
  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <p className="h4 text-center">
              Enter your OTP which you have received via email
            </p>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                // value={otp}
                onChange={(e) => {
                  setError(null);
                  setOTP(e.target.value);
                }}
                placeholder="Enter your OTP"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {error && (
            <div className="mb-3">
              <small style={{ color: "red" }}>{error}</small>
            </div>
          )}
        </Row>
        <Button variant="primary" type="submit">
          Verify
        </Button>
      </Form>
    </Container>
  );
};

export default OTPINput;
