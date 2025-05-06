import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser } from "../utils/Store/slices/userSlice";
import { useNavigate } from "react-router";
import SplitText from "../components/ui/SplitText";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  const handleLogin = async () => {
    const result = await dispatch(loginUser({ emailId, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleSignUp = async () => {
    const result = await dispatch(
      signUpUser({ firstName, lastName, emailId, password })
    );
    if (signUpUser.fulfilled.match(result)) {
      navigate("/profile");
    }
  };

  return (
    <div className="flex min-h-scree overflow-y-hidden">
      {/* Left Side - Split Text */}
      <div className="hidden lg:flex  w-1/2 bg-black items-center justify-center px-10">
        <div className="max-w-xl inline-flex flex-col items-center">
          <SplitText
            text="Welcome to DevTinder"
            className="text-5xl font-bold mb-4"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          <SplitText
            text="Connect with developers around the world!"
            className="text-xl text-muted-foreground"
            delay={200}
            animationFrom={{ opacity: 0, transform: "translate3d(0,30px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 ">
        <div className="card bg-base-300 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-6">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <div>
              {!isLoginForm && (
                <>
                  <label className="form-control w-full my-2">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full my-2">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </>
              )}
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Email ID</span>
                </div>
                <input
                  type="email"
                  value={emailId}
                  className="input input-bordered w-full"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="card-actions justify-center mt-6">
              <button
                className="btn bg-blue-600 w-full"
                onClick={isLoginForm ? handleLogin : handleSignUp}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : isLoginForm
                  ? "Login"
                  : "Sign Up"}
              </button>
            </div>

            <p
              className="text-center cursor-pointer mt-4 text-sm hover:text-primary transition-colors"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Sign up here"
                : "Existing User? Login here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
