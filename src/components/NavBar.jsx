import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser, removeUser } from "../utils/Store/slices/userSlice";
import { CodeXml, LogIn } from "lucide-react";
import { useEffect } from "react";
import { fetchPosts, setPosts } from "../utils/Store/slices/postSlice";

const NavBar = () => {
  const { user } = useSelector((store) => store.user) || {}; // Ensure `store.user` is not null
  const { firstName, photoUrl } = user || {}; // Safely destructure `user`
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const result = await dispatch(fetchPosts()).unwrap();
        if (result && result.posts) {
          dispatch(setPosts(result.posts));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostData();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Hide login button on login page
  const shouldShowLogin = location.pathname !== "/login";

  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <CodeXml />
          DevTinder
        </Link>
      </div>
      {firstName ? (
        <div className="flex-none gap-2">
          <div className="form-control">Welcome, {firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/view-profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : shouldShowLogin ? (
        <button className="flex-none btn bg-blue-600 hover:bg-blue-700">
          <Link to="/login" className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            <span>Login</span>
          </Link>
        </button>
      ) : null}
    </div>
  );
};

export default NavBar;
