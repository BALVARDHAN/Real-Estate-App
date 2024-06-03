import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../ContextAPI";

export default function Header() {
  const navigate = useNavigate();
  const [btn, setBtn] = useState("");
  const { userName } = useContext(Context);
  return (
    <div className="px-32 border-slate-400 h-16 bg-violet-800 flex items-center">
      <div className="flex items-center justify-start w-full mx-auto">
        <button
          className="text-stone-100 text-4xl font-bold mr-16"
          onClick={() => {
            setBtn("home");
            navigate("/");
          }}
        >
          <span className="text-amber-500">LALA</span>{" "}
          <span className="text-stone-200">Rentals</span>
        </button>
        <div className="">
          <ul className="flex text-xl font-medium">
            <button
              className={`${
                btn === "home" ? "text-amber-500" : "text-stone-100"
              } px-4`}
              onClick={() => {
                setBtn("home");
                navigate("/");
              }}
            >
              Home
            </button>
            <button
              className={`${
                btn === "rent" ? "text-amber-500" : "text-stone-100"
              } px-4`}
              onClick={() => {
                setBtn("rent");
                navigate("/rent");
              }}
            >
              Rent
            </button>
            <button
              className={`${
                btn === "about" ? "text-amber-500" : "text-stone-100"
              } px-4`}
              onClick={() => {
                setBtn("about");
                navigate("/");
              }}
            >
              About
            </button>
          </ul>
        </div>
        <div className="ml-auto">
          {userName ? (
            <div className="flex">
              <Link
                to="/new-property"
                className="bg-amber-400 font-bold px-3 py-1"
              >
                Post Property
              </Link>
              <Link
                to="/profile"
                className=" text-xl text-white font-semibold ml-4"
                onClick={() => {
                  setBtn("");
                }}
              >
                {userName}
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-bold px-4 py-2 bg-amber-400 rounded-md"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
