import React from "react";
/* eslint-disable react/prop-types */
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { EditIcon } from "lucide-react";
import { Link } from "react-router";

const ViewProfile = ({ user }) => {
  console.log(user);
  const profile = user;

  if (!profile) {
    return <div className="text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="card bg-black shadow-xl border border-base-300">
          <div className="card-body p-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={profile.photoUrl} alt={profile.firstName} />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-base-content">
                    {profile.firstName + " " + profile.lastName}
                  </h1>
                  <p className="text-xl text-base-content/70">
                    {profile.title}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={"/edit-profile"}>
                  <button className="btn btn-circle btn-white btn-outline">
                    <EditIcon className="h-6 w-6" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-8">
              <p className="text-base-content/80 text-lg">{profile.bio}</p>
            </div>

            {/* Tech Stack */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-base-content/90">
                Programming Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.languages?.map((lang) => (
                  <span
                    key={lang}
                    className="badge badge-primary badge-outline"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-base-content/90">
                Frameworks & Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.frameworks?.map((framework) => (
                  <span
                    key={framework}
                    className="badge badge-secondary badge-outline"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost"
              >
                <FaGlobe className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
