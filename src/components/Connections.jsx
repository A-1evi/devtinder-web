import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connections";
import { Link } from "react-router";

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connection) return;
  if (connection.length === 0) return <h1>No connection found</h1>;
  return (
    <div className="text-center my-12">
      <h1 className="text-xl font-bold">Connections</h1>
      {connection.map((connection) => {
        const { firstName, lastName, age, gender, photoUrl, bio, _id } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center"
          >
            <div>
              <img
                className="w-16  rounded-full"
                src={photoUrl}
                alt="connection pic"
              ></img>
            </div>
            <div className="text-left mx-4">
              <h2>{firstName + " " + lastName}</h2>
              <p className="text-xs">{bio.slice(0,200)+ ".."}</p>
              <p className="text-xs">{age && gender && age + ", " + gender}</p>
            </div>
            <div className="flex-1 text-right items-center justify-center">
              <Link to={`/chat/${_id}`}><button className="btn btn-primary">Chat</button></Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
