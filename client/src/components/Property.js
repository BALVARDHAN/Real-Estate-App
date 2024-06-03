import React from "react";
import { Link } from "react-router-dom";

export default function Property({
  id,
  owner,
  email,
  houseType,
  furnished,
  city,
  state,
  area,
  rent,
  bedrooms,
  bathrooms,
  adress,
  description,
  image,
}) {
  return (
    <Link
      to={`/show-property?id=${id}`}
      className="h-auto p-4 my-3 flex gap-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:shadow-slate-500 shadow-slate-500"
    >
      <div className="bg-slate-100 w-1/3 flex items-center justify-center">
        <img
          className="max-h-full max-w-full shadow-md shadow-black mr-2"
          src={`http://localhost:4000/images/${image[0]}`}
        />
      </div>
      <div className="w-2/3">
        <h1 className="text-stone-800 font-semibold mb-2">{`${bedrooms} BHK ${houseType} in ${city}, ${state}`}</h1>
        <p className="text-sm underline mb-3">{`Owner: ${owner}`}</p>
        <span className="bg-sky-300 rounded-full text-sm font-semibold px-2 py-1">
          {furnished ? "Furnished" : "Unfurnished"}
        </span>
        <div className="flex mt-3 bg-gray-200 py-2 border border-slate-300 rounded-md">
          <div className="flex flex-col w-1/4 text-center border-r border-slate-400">
            <p className="text-xs text-stone-600">Rent</p>
            <p className="font-semibold">₹{rent}</p>
          </div>
          <div className="flex flex-col w-1/4 text-center border-r border-slate-400">
            <p className="text-xs text-stone-600">Area(sqft)</p>
            <p className="font-semibold">{area}</p>
          </div>
          <div className="flex flex-col w-1/4 text-center border-r border-slate-400">
            <p className="text-xs text-stone-600">Bedrooms</p>
            <p className="font-semibold">{bedrooms}</p>
          </div>
          <div className="flex flex-col w-1/4 text-center">
            <p className="text-xs text-stone-600">Bathrooms</p>
            <p className="font-semibold">{bathrooms}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-stone-600">{description}</p>
      </div>
    </Link>
  );
}
