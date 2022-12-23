import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {user?.name}</p>
    </div>
  );
};

export default Profile;
