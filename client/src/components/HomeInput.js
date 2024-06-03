import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeInput() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    location: "",
    budget: Number.MAX_VALUE,
  });
  function handleInputChange(event) {
    setFormDetails((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleSearch() {
    navigate(
      `/rent?city=${formDetails["location"]}&budget=${formDetails["budget"]}`
    );
  }
  return (
    <div className="bg-slate-100 rounded-lg flex flex-col p-8 w-96">
      <div className="flex flex-col mb-4">
        <label className="mb-1">Location:</label>
        <input
          name="location"
          type="text"
          className="shadow-md bg-slate-200 h-10 px-3"
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </div>
      <div className="flex flex-col mb-10">
        <label className="mb-1">Maximum Budget:</label>
        <input
          name="budget"
          type="text"
          className="shadow-md rounded-sm bg-slate-200 h-10 px-3"
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </div>
      <button
        onClick={handleSearch}
        className="border shadow-md shadow-slate-600 bg-amber-400 py-2 text-2xl font-bold"
      >
        Search
      </button>
    </div>
  );
}
