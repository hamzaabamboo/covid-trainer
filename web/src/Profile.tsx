import React, { useContext } from "react";
import { UserContext } from "./UserProvider";

export const Profile: React.FC = () => {
  const { user, signOut } = useContext(UserContext);

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center ">
      {user && (
        <div className="max-w-md ">
          <img src={user.photo} alt="profilepic" />
          <h1 className="text-6xl">{user.name}</h1>
          <button
            className="p-4 bg-red-500 rounded-md text-xl"
            onClick={signOut}
          >
            Roggu Auto
          </button>
        </div>
      )}
    </div>
  );
};
