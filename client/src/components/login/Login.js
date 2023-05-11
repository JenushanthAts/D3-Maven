import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "context/authContext";
import { LoginFailure, LoginStart, LoginSuccess } from "context/action";
import { authService } from "services/authService";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleOnChange = (e) => {
    setError(null);
    let { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try {
      const res = await authService.login(loginData);
      dispatch(LoginSuccess(res));
      if (res?.firstLogin && res?.userRole === "customer") {
        navigate("/update-password");
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch(LoginFailure());
      setError(err.message);
      return;
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={loginData.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={loginData.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {error && (
            <div className="mt-3">
              <small style={{ color: "red" }}>{error}</small>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default Login;
