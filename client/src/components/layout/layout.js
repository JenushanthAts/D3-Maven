const { Outlet } = require("react-router-dom");
const { default: Topbar } = require("./TopBar/Topbar");

export const Layout = () => {
  return (
    <div>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Outlet />
      </div>
    </div>
  );
};
