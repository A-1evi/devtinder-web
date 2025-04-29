import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) return null;
  return <EditProfile user={user} />;
};

export default Profile;
