import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="text-center my-10 font-bold">
        No request found..better luck next life
      </div>
    );
  return (
    <div className="text-center my-12">
      <h1>Requests(pending..)</h1>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, photoUrl, bio, _id } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div className="flex items-center">
              <div>
                <img
                  className="w-16  rounded-full"
                  src={photoUrl}
                  alt="connection pic"
                ></img>
              </div>
              <div className="text-left mx-4">
                <h2>{firstName + " " + lastName}</h2>
                <p className="text-xs">{bio.slice(0,20)}</p>
                <p>{age && gender && age + ", " + gender}</p>
              </div>
            </div>
            <div className="">
              <button className="btn btn-outline btn-info mx-2">Accept</button>
              <button className="btn btn-outline btn-error mx-2">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
