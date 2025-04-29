import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/Store/slices/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const requestReceived = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/profile/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };

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

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-neutral-dark">
          No request found..
        </h1>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        Requests{" "}
        <span className="text-base text-neutral-dark">(pending..)</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-base-100 rounded-xl shadow-lg">
          <thead>
            <tr className="text-left text-primary border-b border-neutral-medium">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Bio</th>
              <th className="py-3 px-4">Age/Gender</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              const { firstName, lastName, age, gender, photoUrl, bio, _id } =
                request.fromUserId;
              return (
                <tr
                  key={_id}
                  className="border-b border-neutral-light hover:bg-base-200 transition"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                      src={photoUrl}
                      alt="connection pic"
                    />
                    <span className="font-medium text-primary">
                      {firstName} {lastName}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-neutral-dark">
                    {bio && bio.trim() !== ""
                      ? bio.slice(0, 40) + "..."
                      : "No bio added yet"}
                  </td>
                  <td className="py-3 px-4 text-xs text-neutral-dark">
                    {age && gender ? `${age}, ${gender}` : ""}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col gap-2 items-center">
                      <button
                        className="btn btn-outline btn-info w-24"
                        onClick={() => requestReceived("accepted", request._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-outline btn-error w-24"
                        onClick={() => requestReceived("rejected", request._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request;
