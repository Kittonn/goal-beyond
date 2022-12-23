import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { registerUser } from "../store/authAction";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) navigate("/profile");
    if (success) navigate("/login");
  }, [navigate, user, success]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } else {
      dispatch(registerUser(formData));
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="block border-[1px] border-black rounded-md py-1 px-2"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="block border-[1px] border-black rounded-md py-1 px-2"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="block border-[1px] border-black rounded-md py-1 px-2"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="block border-[1px] border-black rounded-md py-1 px-2"
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
