import React, { useState } from "react";
import { LoginI } from "../interfaces/auth.interface";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginI>({
    email: "",
    password: "",
  });

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
