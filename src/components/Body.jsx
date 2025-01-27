import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
