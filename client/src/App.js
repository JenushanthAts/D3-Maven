import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "routes/MainRoute";
import { ContextProvider } from "context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
}

export default App;
