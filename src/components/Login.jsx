import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="bg-base-300 mx-auto my-8 p-4 w-96 max-w-md rounded shadow h-[515px] ">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {showSignup ? "Sign up" : "Login"}
        </h2>

        {showSignup && (
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        )}
        {showSignup && (
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="input input-bordered w-full mt-1"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="flex items-center justify-between">
          <p
            onClick={() => setShowSignup(!showSignup)}
            className="text-sm text-blue-500 cursor-pointer hover:underline"
          >
            {showSignup
              ? "Already registered? Click here!"
              : "New user? Register now"}
          </p>
          <button
            className="btn btn-primary"
            onClick={showSignup ? handleSignup : handleLogin}
          >
            {showSignup ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
