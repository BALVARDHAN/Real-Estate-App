import React, { useContext, useEffect, useState } from "react";
import { Context } from "../ContextAPI";
import Property from "./Property";

export default function ProfileProperties() {
  const [properties, setProperties] = useState([]);
  const { userName, email } = useContext(Context);
  useEffect(() => {
    fetch("http://localhost:4000/rent")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);
  return (
    <ul>
      {properties.map((item) => {
        if (item.email === email) {
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
                showDelete={true}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}
