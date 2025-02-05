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

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
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
      return navigate("/profile");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };
  return (
    <div className="card card-border bg-base-300 w-96 my-14  mx-auto ">
      <div className="card-body">
        <h2 className="card-title">{showSignup ? "Sign up" : "Login"}</h2>
        {showSignup && (
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First name</legend>
            <input
              type="text"
              className="input"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
        )}
        {showSignup && (
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your email?</legend>
          <input
            type="text"
            className="input"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <p className="text-red-700">{error}</p>

        <div className="card-actions justify-between ">
          <div>
            <p
              onClick={() => setShowSignup(!showSignup)}
              className="cursor-pointer hover:underline hover:text-blue-400 "
            >
              {showSignup
                ? "Already registered? Click here!"
                : "New user? register now"}
            </p>
          </div>
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
