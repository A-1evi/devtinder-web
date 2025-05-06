import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Store/slices/userSlice";
import { useEffect } from "react";

const Body = () => {


  return (
    <div className="min-h-screen flex flex-col bg-black">
      <NavBar />
      <main className="flex-1 flex flex-col justify-center w-full px-2 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Body;
