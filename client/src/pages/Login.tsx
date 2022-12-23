import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/auth/authAction";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email === "" && formData.password === "") return;
    dispatch(userLogin(formData));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="block  py-1 px-2 border-[1px] border-black rounded-md"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="block  py-1 px-2 border-[1px] border-black rounded-md"
            required
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
