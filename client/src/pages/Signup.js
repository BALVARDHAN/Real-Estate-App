import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [afterMsg, setAfterMsg] = useState("");
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cnfpassword: "",
  });
  function handleInputChange(event) {
    setSignUpDetails((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleSubmit() {
    if (
      signUpDetails["firstName"] === "" ||
      signUpDetails["last"] === "" ||
      signUpDetails["email"] === "" ||
      signUpDetails["password"] === ""
    ) {
      setAfterMsg("Please provide full details");
      return;
    }
    if (!signUpDetails["email"].includes("@")) {
      setAfterMsg("Please enter a valid email");
      return;
    }
    if (signUpDetails["password"] !== signUpDetails["cnfpassword"]) {
      setAfterMsg("Passwords do not match");
      return;
    }
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          navigate("/login");
        } else {
          setAfterMsg("Email already exists");
        }
      });
  }
  return (
    <div className="h-screen bg-violet-600 flex justify-center items-start">
      <div className="lg:w-1/4 md:w-1/3 rounded-lg border flex flex-col p-10 mt-32 md:mt-10 bg-white shadow-2xl shadow-slate-800">
        <h1 className="mb-10 font-semibold">CREATE NEW ACCOUNT</h1>
        <div className="flex gap-2">
          <div className="flex flex-col w-1/2">
            <label className="mb-2">First Name</label>
            <input
              className="border border-slate-300 px-2 py-1 rounded-md mb-2 w-full"
              type="text"
              name="firstName"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-2">Last Name</label>
            <input
              className="border border-slate-300 px-2 py-1 rounded-md mb-2 w-full"
              type="text"
              name="lastName"
              onChange={handleInputChange}
            />
          </div>
        </div>
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
        <label>Confirm Password</label>
        <input
          className="border border-slate-300 px-2 py-1 rounded-md mb-2"
          type="password"
          name="cnfpassword"
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
          onClick={handleSubmit}
          className="border py-2 mt-5 mb-4 bg-amber-400 font-semibold text-lg shadow-md shadow-slate-600"
        >
          Sign Up
        </button>
        <Link to="/login" className="w-16 ml-auto text-blue-900 font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
