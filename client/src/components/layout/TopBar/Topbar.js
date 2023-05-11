import React, { useContext } from "react";
import "./topbar.css";
import { AuthContext } from "context/authContext";
import { useNavigate } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Logout } from "context/action";
import { customerService } from "services/customerService";
const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const signOut = async () => {
    try {
      const res = await customerService.updateStatus("in-active");
      if (res) {
        dispatch(Logout());
        navigate("/");
      }
    } catch (err) {
      return err;
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>D3 Maven</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            {user.userRole === "admin" ? (
              <>
                <Nav.Link onClick={() => navigate("/create-customer")}>
                  Create Customer
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/view-customers")}>
                  View Customers
                </Nav.Link>
              </>
            ) : null}
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQUXqMrzrmkxd3QpxGL5bzgxELsztrL1AgQ&usqp=CAU"
                    alt="User Logo"
                    className="topAvatar"
                  />
                  <span className="user">{user.fullName}</span>
                </>
              }
              id="user-dropdown"
            >
              <NavDropdown.Item onClick={() => signOut()}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
