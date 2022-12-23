import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout, setCredentials } from "../store/authSlice";
import { useGetDetailsQuery } from "../store/authService";

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 90000,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      {user ? (
        <div>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
