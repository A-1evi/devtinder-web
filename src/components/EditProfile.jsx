/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Store/slices/userSlice";
import { Button } from "./ui/button";
import { ArrowLeft, Camera, User2 } from "lucide-react";

const EditProfile = ({ user, onBack }) => {
  const userData = user;
  console.log(userData);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [age, setAge] = useState(userData.age || "");
  const [gender, setGender] = useState(userData.gender || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [title, setTitle] = useState(userData.title || "");
  const [languages, setLanguages] = useState(userData.languages || []);
  const [frameworks, setFrameworks] = useState(userData.frameworks || []);
  const [githubUrl, setGithubUrl] = useState(userData.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(userData.linkedinUrl || "");
  const [portfolio, setPortfolio] = useState(userData.portfolio || "");
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
          title,
          languages,
          frameworks,
          githubUrl,
          linkedinUrl,
          portfolio,
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
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
          {onBack && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Card */}
          <div className=" backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">
              Profile Preview
            </h2>
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-40 h-40 rounded-full border-4 border-blue-500/50 shadow-lg object-cover group-hover:opacity-75 transition-all duration-200"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center">
                    <User2 className="w-20 h-20 text-gray-500" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="w-full max-w-md space-y-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Name
                  </h3>
                  <p className="text-lg text-white">
                    {firstName} {lastName}
                  </p>
                </div>

                {age && (
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Age
                    </h3>
                    <p className="text-lg text-white">{age}</p>
                  </div>
                )}

                {gender && (
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Gender
                    </h3>
                    <p className="text-lg text-white">{gender}</p>
                  </div>
                )}

                {bio && (
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Bio
                    </h3>
                    <p className="text-lg text-white">{bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className=" backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">
              Edit Information
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Gender
                  </label>
                  <select
                    value={gender}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={title}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Full Stack Developer"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Programming Languages
                </label>
                <input
                  type="text"
                  value={languages.join(", ")}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={(e) =>
                    setLanguages(
                      e.target.value.split(", ").filter((lang) => lang)
                    )
                  }
                  placeholder="e.g. JavaScript, Python, TypeScript (comma-separated)"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Frameworks & Technologies
                </label>
                <input
                  type="text"
                  value={frameworks.join(", ")}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFrameworks(
                      e.target.value
                        .split(", ")
                        .filter((framework) => framework)
                    )
                  }
                  placeholder="e.g. React, Node.js, Django (comma-separated)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={portfolio}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://portfolio.dev"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Bio
                </label>
                <textarea
                  value={bio}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32 resize-none"
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={saveProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down">
          Profile saved successfully
        </div>
      )}
    </div>
  );
};

export default EditProfile;
