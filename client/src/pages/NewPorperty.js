import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../ContextAPI";

export default function NewPorperty() {
  const navigate = useNavigate();
  const { userName, email } = useContext(Context);
  const [image, setImage] = useState();
  const [propertyDetails, setPropertyDetails] = useState({
    owner: userName,
    email: email,
    houseType: "flat",
    availableFor: "all",
    availableFrom: "",
    postedOn: "",
    furnished: true,
    City: "",
    state: "",
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    rent: 0,
    adress: "",
    description: "",
    imageName: [],
  });
  function handleHouseTypeClick(type) {
    setPropertyDetails((prev) => {
      return {
        ...prev,
        houseType: type,
      };
    });
  }
  function handleInputChange(event) {
    setPropertyDetails((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    setPropertyDetails((prev) => {
      return {
        ...prev,
        imageName: image["name"],
      };
    });
    fetch("http://localhost:4000/new-listing-image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  function handleFileChange(event) {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    fetch("http://localhost:4000/new-listing-image", {
      method: "POST",
      body: formData,
    });
    setPropertyDetails((prev) => {
      let temp = event.target.files[0];
      return {
        ...prev,
        imageName: [...propertyDetails["imageName"], temp["name"]],
      };
    });
  }
  function handleSubmit() {
    console.log(propertyDetails);
    fetch("http://localhost:4000/new-listing-final", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyDetails),
    });
    navigate("/");
  }
  if (!userName) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="h-screen overflow-scroll hide-scrollbar bg-violet-600 flex justify-center items-start">
      <div className="w-1/3 mt-4 rounded-2xl border flex flex-col p-10 pt-5 bg-white shadow-2xl shadow-slate-800">
        <h1 className="mb-6 font-semibold">Let's get you started</h1>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${
              propertyDetails["houseType"] === "flat"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => handleHouseTypeClick("flat")}
          >
            Flat
          </button>
          <button
            className={`${
              propertyDetails["houseType"] === "house"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => handleHouseTypeClick("house")}
          >
            House
          </button>
          <button
            className={`${
              propertyDetails["houseType"] === "villa"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => handleHouseTypeClick("villa")}
          >
            Villa
          </button>
          <button
            className={`${
              propertyDetails["houseType"] === "farmhouse"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => handleHouseTypeClick("farmhouse")}
          >
            Farmhouse
          </button>
          <button
            className={`${
              propertyDetails["houseType"] === "studio"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => handleHouseTypeClick("studio")}
          >
            Studio Apartment
          </button>
        </div>
        <div className="flex mt-6 gap-4">
          <div className="flex flex-col">
            <label className="mr-2">Total Bedrooms:</label>
            <input
              type="number"
              className="border border-slate-300 rounded-sm px-1"
              name="bedrooms"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mr-2">Total Bathrooms:</label>
            <input
              type="number"
              className="border border-slate-300 rounded-sm px-1"
              name="bathrooms"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-col">
            <label>Rent:</label>
            <input
              type="number"
              className="border border-slate-300 px-1"
              name="rent"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Area:</label>
            <input
              type="number"
              className="border border-slate-300 px-1"
              name="area"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <label className="mr-3">Available For:</label>
          <button
            className={`${
              propertyDetails["availableFor"] === "all"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => {
              setPropertyDetails((prev) => {
                return {
                  ...prev,
                  availableFor: "all",
                };
              });
            }}
          >
            All
          </button>
          <button
            className={`${
              propertyDetails["availableFor"] === "family"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => {
              setPropertyDetails((prev) => {
                return {
                  ...prev,
                  availableFor: "family",
                };
              });
            }}
          >
            Family
          </button>
          <button
            className={`${
              propertyDetails["availableFor"] === "single"
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => {
              setPropertyDetails((prev) => {
                return {
                  ...prev,
                  availableFor: "single",
                };
              });
            }}
          >
            Single
          </button>
        </div>
        <div className="mt-6">
          <label className="mr-5">Available From:</label>
          <input
            className="border border-slate-300 px-1"
            type="date"
            name="availableFrom"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-6 flex items-center gap-2">
          <label className="mr-3">Furnishing:</label>
          <button
            className={`${
              propertyDetails["furnished"] === true
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => {
              setPropertyDetails((prev) => {
                return {
                  ...prev,
                  furnished: true,
                };
              });
            }}
          >
            Furnished
          </button>
          <button
            className={`${
              propertyDetails["furnished"] === false
                ? "bg-cyan-500 border-2 border-black"
                : "bg-cyan-100"
            } border border-cyan-500 rounded-full px-5 py-1 font-semibold`}
            onClick={() => {
              setPropertyDetails((prev) => {
                return {
                  ...prev,
                  furnished: false,
                };
              });
            }}
          >
            Non-Furnished
          </button>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-col">
            <label>City:</label>
            <input
              type="text"
              className="border border-slate-300 px-1"
              name="city"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>State:</label>
            <input
              type="text"
              className="border border-slate-300 px-1"
              name="state"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label>Address:</label>
          <input
            name="adress"
            type="text"
            className="border border-slate-300 px-1"
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label>Description:</label>
          <textarea
            className="border border-slate-300 px-1"
            name="description"
            onChange={handleInputChange}
            required
          />
        </div>
        <form onSubmit={handleFormSubmit} className="mt-4 flex flex-col">
          <label className="font-semibold">Upload 3 Images of Property </label>
          <div className="flex my-2">
            <input className="mt-2" type="file" onChange={handleFileChange} />
            <input className="mt-2" type="file" onChange={handleFileChange} />
            <input className="mt-2" type="file" onChange={handleFileChange} />
          </div>
        </form>
        <button
          onClick={handleSubmit}
          className="py-2 bg-amber-400 mt-4 shadow-md shadow-slate-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
