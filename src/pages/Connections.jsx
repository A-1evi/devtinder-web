import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/Store/slices/connectionsSlice";
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

  if (!connection) return null;
  if (connection.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-neutral-dark">
          No connection found
        </h1>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-2">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        Connections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {connection.map((connection) => {
          const { firstName, lastName, age, gender, photoUrl, bio, _id } =
            connection;
          return (
            <div
              key={_id}
              className="flex flex-col items-center bg-base-100 rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                className="w-24 h-24 rounded-full border-4 border-primary mb-4 object-cover shadow"
                src={photoUrl}
                alt="connection pic"
              />
              <h2 className="text-lg font-semibold text-primary mb-1">
                {firstName} {lastName}
              </h2>
              <p className="text-xs text-neutral-dark mb-1 text-center">
                {bio.slice(0, 100) + ".."}
              </p>
              <p className="text-xs text-neutral-dark mb-4">
                {age && gender && `${age}, ${gender}`}
              </p>
              <Link to={`/chat/${_id}`} className="w-full">
                <button className="btn btn-primary w-full">Chat</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
