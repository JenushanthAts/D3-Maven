import { createContext, useState } from "react";

export const RecoveryContext = createContext();
export const RecoveryContextProvider = ({ children }) => {
  const [page, setPage] = useState("reset");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [otp, setOTP] = useState("");

  return (
    <RecoveryContext.Provider
      value={{
        page,
        setPage,
        password,
        setPassword,
        otp,
        setOTP,
      }}
    >
      {children}
    </RecoveryContext.Provider>
  );
};
