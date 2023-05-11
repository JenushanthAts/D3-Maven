import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Layout } from "components/layout/layout";
import Login from "components/login/Login";
import CreateCustomer from "components/customer/CreateCustomer";
import ViewCustomers from "components/customer/ViewCustomers";
import Home from "components/home/Home";
import UpdatePassword from "components/update-password";
import { RecoveryContextProvider } from "context/recoveryContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-customer",
        element: <CreateCustomer />,
      },
      {
        path: "/view-customers",
        element: <ViewCustomers />,
      },
      {
        path: "/update-password",
        element: (
          <RecoveryContextProvider>
            <UpdatePassword />,
          </RecoveryContextProvider>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
