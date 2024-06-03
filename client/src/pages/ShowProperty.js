import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Context } from "../ContextAPI";
import heartLog1 from "./logo/heart2.png";
import heartLog2 from "./logo/heart3.png";
import deleteLogo from "./logo/delete.png";

export default function ShowProperty() {
  const navigate = useNavigate();
  const { userName, email, wishlist, setContext } = useContext(Context);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentProperty, setCurrentProperty] = useState({
    imageName: [],
  });
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (wishlist.includes(id)) {
      setIsWishlisted(true);
    }
    fetch("http://localhost:4000/show-property", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId: id }),
    })
      .then((res) => res.json())
      .then((data) => setCurrentProperty(data));
  }, [id]);
  function handleWishlistClick() {
    if (!userName) {
      navigate("/login");
      return;
    }
    setIsWishlisted((prev) => {
      fetch("http://localhost:4000/wishlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          propertyId: id,
          isWishlisted: !isWishlisted,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          setContext((prev) => {
            return {
              ...prev,
              wishlist: data.wishlist,
            };
          })
        );
      return !prev;
    });
  }
  function handlePropertyDelete() {
    fetch("http://localhost:4000/property-delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId: id }),
    })
      .then((res) => res.json())
      .then((data) => navigate(-1));
  }
  return (
    <div className="h-screen overflow-scroll hide-scrollbar bg-violet-200 p-10 flex justify-center items-start gap-4">
      <div className="w-1/2 bg-white p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-stone-600 mb-3">
            ₹{currentProperty["rent"]}/
            <span className="text-lg font-semibold text-stone-500">Month</span>
          </h1>
          <div className="flex gap-3">
            {currentProperty["email"] === email ? (
              <button
                className="w-11 h-11 rounded-lg shadow-sm shadow-black flex justify-center items-center bg-red-500"
                onClick={handlePropertyDelete}
              >
                <img className="w-7 invert" src={deleteLogo} />
              </button>
            ) : (
              <button className="w-8" onClick={handleWishlistClick}>
                <img src={isWishlisted ? heartLog1 : heartLog2} className="" />
              </button>
            )}
          </div>
        </div>
        <p className="mb-4 text-stone-500">{`${currentProperty["bedrooms"]} BHK ${currentProperty["area"]} sqft ${currentProperty["houseType"]} For Rent in ${currentProperty["city"]}, ${currentProperty["state"]}`}</p>

        <Carousel>
          <div>
            <img
              src={`http://localhost:4000/images/${currentProperty["imageName"][0]}`}
            />
          </div>
          <div>
            <img
              src={`http://localhost:4000/images/${currentProperty["imageName"][1]}`}
            />
          </div>
          <div>
            <img
              src={`http://localhost:4000/images/${currentProperty["imageName"][2]}`}
            />
          </div>
        </Carousel>

        <div>
          <div className="flex bg-slate-300 py-2 px-4 mb-1">
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Configuration</p>
              <p className="font-semibold">{`${currentProperty["bedrooms"]} Bedrooms, ${currentProperty["bathrooms"]} Bathrooms`}</p>
            </div>
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Rent</p>
              <p className="font-semibold">{currentProperty["rent"]}</p>
            </div>
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Carpet Area</p>
              <p className="font-semibold">{`${currentProperty["area"]} sqft`}</p>
            </div>
          </div>
          <div className="flex bg-slate-300 py-2 px-4 mb-1">
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Furnishing</p>
              <p className="font-semibold">
                {currentProperty["furnished"] ? "Furnished" : "Unfurnished"}
              </p>
            </div>
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Property Type</p>
              <p className="font-semibold">{currentProperty["houseType"]}</p>
            </div>
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Available For</p>
              <p className="font-semibold">{currentProperty["availableFor"]}</p>
            </div>
          </div>
          <div className="flex bg-slate-300 py-2 px-4 mb-1">
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Available From</p>
              <p className="font-semibold">
                {currentProperty["availableFrom"]}
              </p>
            </div>
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Posted On</p>
              <p className="font-semibold">{currentProperty["postedOn"]}</p>
            </div>
            <div className="flex flex-col w-1/3">
              <p className="text-stone-500 font-normal">Address</p>
              <p className="font-semibold">{`${currentProperty["adress"]}, ${currentProperty["city"]}, ${currentProperty["state"]}`}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-lg text-stone-800 font-semibold mb-2 underline">
            Description
          </h1>
          <p className="text-stone-700">{currentProperty["description"]}</p>
        </div>
      </div>
    </div>
  );
}
