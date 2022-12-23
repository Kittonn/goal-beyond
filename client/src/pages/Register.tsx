import React, { useState } from "react";
import { RegisterI } from "../interfaces/auth.interface";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterI>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.password2 === ""
    ) {
      return alert("Please fill in all fields");
    }
    if (formData.password !== formData.password2) {
      return alert("Passwords do not match");
    } else {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder="Enter yout email"
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder="Enter password"
        />
        <input
          type="text"
          name="password2"
          value={formData.password2}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder="Enter confirm password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
