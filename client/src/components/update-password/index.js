import { RecoveryContext } from "context/recoveryContext";
import React, { useContext } from "react";
import Reset from "./Reset";
import OTPINput from "./OTPInput";
import Recovered from "./Recovered";

const UpdatePassword = () => {
  const { page } = useContext(RecoveryContext);
  function NavigateComponents() {
    if (page === "reset") return <Reset />;
    if (page === "otp") return <OTPINput />;
    if (page === "recovered") return <Recovered />;
  }
  return <>{NavigateComponents()}</>;
};

export default UpdatePassword;
