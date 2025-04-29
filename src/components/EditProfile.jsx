
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Store/slices/userSlice";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const EditProfile = ({ user, onBack }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [bio, setBio] = useState(user.bio || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          bio,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        if (onBack) onBack();
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full px-4">
        {/* Preview Section */}
        <div className="card bg-base-300 w-full md:w-1/2 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Preview</h2>
            <div className="space-y-4">
              {photoUrl && (
                <div className="flex justify-center">
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="rounded-full w-32 h-32 object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium text-neutral-dark">
                    Name
                  </h3>
                  <p className="text-lg">
                    {firstName} {lastName}
                  </p>
                </div>

                {age && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-dark">
                      Age
                    </h3>
                    <p className="text-lg">{age}</p>
                  </div>
                )}

                {gender && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-dark">
                      Gender
                    </h3>
                    <p className="text-lg">{gender}</p>
                  </div>
                )}

                {bio && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-dark">
                      Bio
                    </h3>
                    <p className="text-lg">{bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form Section */}
        <div className="card bg-base-300 w-full md:w-1/2 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Edit Profile</h2>
              {onBack && (
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  value={bio}
                  className="textarea textarea-bordered h-24"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="card-actions justify-end">
                <Button onClick={saveProfile}>Save Profile</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
