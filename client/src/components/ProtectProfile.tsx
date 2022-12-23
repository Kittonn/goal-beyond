import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Outlet, Link } from "react-router-dom";

const ProtectProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return (
      <div>
        <h1>Unauthorized :(</h1>
        <span>
          <Link to="/login">Login </Link>to gain access.
        </span>
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectProfile;
