import React, { useContext, useState } from "react";
import { Context } from "../ContextAPI";
import ProfileProperties from "../components/ProfileProperties";
import ProfileWishlist from "../components/ProfileWishlist";

export default function Profile() {
  const { userName, email } = useContext(Context);
  const [btn, setBtn] = useState("properties");
  return (
    <div className="bg-stone-200 h-screen overflow-scroll">
      <div className="w-1/2 mx-auto mt-10 bg-white p-10">
        <h1 className="text-4xl font-semibold text-stone-700 mb-2">
          {userName}
        </h1>
        <p className="mb-5">{`Email - ${email}`}</p>
        <div className="flex gap-2">
          <button
            className={`${
              btn === "properties" ? "bg-stone-400" : ""
            } w-40 py-1 px-4 font-semibold border`}
            onClick={() => setBtn("properties")}
          >
            Your Properties
          </button>
          <button
            className={`${
              btn === "wishlist" ? "bg-stone-400" : ""
            } w-40 py-1 px-4 font-semibold border`}
            onClick={() => setBtn("wishlist")}
          >
            Wishlist
          </button>
        </div>
        <div className="border-b my-2"></div>
        <div>
          {btn === "properties" ? <ProfileProperties /> : <ProfileWishlist />}
        </div>
      </div>
    </div>
  );
}
