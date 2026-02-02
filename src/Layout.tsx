import Header from "./app/components/Header/Header";
import { Outlet } from "react-router-dom";
// import Loader from "./app/components/Loader/Loader";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
