import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../ContextAPI";

export default function Login() {
  const navigate = useNavigate();
  const { setContext } = useContext(Context);
  const [afterMsg, setAfterMsg] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  function handleInputChange(event) {
    setLoginDetails((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleLogin() {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setContext((prev) => {
            return {
              ...prev,
              userName: data.name,
              email: data.email,
              wishlist: data.wishlist,
            };
          });
          localStorage.setItem("user", data);
          navigate("/");
        } else if (data.status === "fail") {
          setAfterMsg("Incorrect Password");
        } else {
          setAfterMsg("User Not Found");
        }
      });
  }
  return (
    <div className="h-screen bg-violet-600 flex justify-center items-start">
      <div className="w-1/5 md:w-1/4 rounded-lg border flex flex-col p-10 mt-32 md:mt-10 bg-white shadow-2xl shadow-slate-800">
        <h1 className="mb-10 font-semibold">LOGIN</h1>
        <label className="mb-2">Email</label>
        <input
          className="border border-slate-300 px-2 py-1 rounded-md mb-2"
          type="email"
          name="email"
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          className="border border-slate-300 px-2 py-1 rounded-md mb-2"
          type="password"
          name="password"
          onChange={handleInputChange}
        />
        <p
          className={`${
            afterMsg ? "text-red-500 font-semibold text-center mt-2" : undefined
          }`}
        >
          {afterMsg}
        </p>
        <button
          onClick={handleLogin}
          className="border py-2 mt-5 mb-4 bg-amber-400 font-semibold text-lg shadow-md shadow-slate-600"
        >
          LOGIN
        </button>
        <Link to="/signup" className="w-16 ml-auto text-blue-900 font-semibold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
