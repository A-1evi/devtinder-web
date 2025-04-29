import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/Store/appStore";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Request from "./pages/Request";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermAndCondition from "./pages/TermAndCondition";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Request />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/term-and-condition"
                element={<TermAndCondition />}
              />
              <Route path="/chat/:targetId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
