import React, { useEffect, useState } from "react";
import Property from "../components/Property";
import { useSearchParams } from "react-router-dom";

export default function Rent() {
  const [rentals, setRentals] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    maxBudget: Number.MAX_VALUE,
    propertyType: "all",
    bhk: "all",
  });
  const [searchParams] = useSearchParams();
  const searchedCity = searchParams.get("city");
  const searchedBugt = searchParams.get("budget");

  useEffect(() => {
    fetch("http://localhost:4000/rent")
      .then((res) => res.json())
      .then((data) => setRentals(data));
    if (searchedCity) {
      setFilters((prev) => {
        return {
          ...prev,
          city: searchedCity,
        };
      });
    }
    if (searchedBugt) {
      setFilters((prev) => {
        return {
          ...prev,
          maxBudget: searchedBugt,
        };
      });
    }
  }, [searchedCity]);
  function handleFilterChange(event) {
    setFilters((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  function checkFilter(item) {
    console.log(item["city"]);
    if (
      filters["city"] &&
      item["city"].toUpperCase() !== filters["city"].toUpperCase()
    ) {
      console.log("1");
      return false;
    } else if (filters["maxBudget"] && item["rent"] > filters["maxBudget"]) {
      console.log("2");
      return false;
    } else if (
      filters["propertyType"] !== "all" &&
      item["houseType"] !== filters["propertyType"]
    ) {
      console.log("3");
      return false;
    } else if (filters["bhk"] !== "all") {
      if (filters["bhk"] === "5bhk") {
        if (item["bedrooms"] < 5) {
          console.log("4");
          return false;
        }
      } else if (item["bedrooms"] !== parseInt(filters["bhk"][0])) {
        console.log("5");
        return false;
      }
    }
    return true;
  }
  return (
    <div className="flex flex-col bg-violet-200 h-screen overflow-scroll hide-scrollbar">
      <div className="flex py-2 bg-amber-200">
        <div className="w-1/2 mx-auto flex">
          <div className="flex flex-col justify-start items-start">
            <label>Enter City:</label>
            <input
              type="text"
              name="city"
              className="border border-slate-300 py-1 rounded-md px-2 mr-2"
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label>Max Budget:</label>
            <input
              type="number"
              name="maxBudget"
              className="border border-slate-300 py-1 rounded-md px-2 mr-2"
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label>Property Type</label>
            <select
              className="border border-slate-300 py-1 rounded px-2 mr-2"
              name="propertyType"
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="flat">flat</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="farmHouse">Farmhouse</option>
              <option value="studio">Studio Apartment</option>
            </select>
          </div>
          <div className="flex flex-col justify-start items-start">
            <label>BHK</label>
            <select
              className="border border-slate-300 py-1 rounded px-2 mr-2"
              name="bhk"
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="1bhk">1BHK</option>
              <option value="2bhk">2BHK</option>
              <option value="3bhk">3BHK</option>
              <option value="4bhk">4BHK</option>
              <option value="5bhk">{`>4BHK`}</option>
            </select>
          </div>
        </div>
      </div>
      <ul className="mx-auto w-1/2 mt-4">
        {rentals.map((item) => {
          if (checkFilter(item)) {
            return (
              <li key={item._id}>
                <Property
                  id={item._id}
                  owner={item.owner}
                  email={item.email}
                  houseType={item.houseType}
                  furnished={item.furnished}
                  city={item.city}
                  state={item.state}
                  image={item.imageName}
                  bedrooms={item.bedrooms}
                  bathrooms={item.bathrooms}
                  area={item.area}
                  rent={item.rent}
                  adress={item.adress}
                  description={item.description}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
