/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const UserCard = ({ user }) => {
  // eslint-disable-next-line react/prop-types
  if (!user) return;
  const { firstName, lastName, age, bio, gender, photoUrl, skills } = user;

  return (
    user && (
      <div className="card bg-base-300 w-96 shadow-sm m-2 p-2">
        <figure>
          <img src={photoUrl} alt="Shoes" className="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <h3>{age && gender && age + ", " + gender}</h3>
          <p>{bio && bio}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignored</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
