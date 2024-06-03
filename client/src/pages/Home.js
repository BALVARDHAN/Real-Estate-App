import React from "react";
import HomeInput from "../components/HomeInput";
import { Link } from "react-router-dom";
import bangloreLogo from "./logo/bangalore.png";
import delhiLogo from "./logo/delhi4.png";
import chennaiLogo from "./logo/chennai4.png";
import hyderLogo from "./logo/hyder.png";
import mumbaiLogo from "./logo/mumbai.png";
import jaipurLogo from "./logo/jaipur2.png";

export default function Home() {
  return (
    <div className="h-screen bg-violet-600 lg:pt-16 md:pt-10 flex flex-col justify-start overflow-scroll hide-scrollbar">
      <div className="flex justify-between px-32">
        <div className=" flex flex-col">
          <div className="lg:text-7xl md:text-5xl text-slate-200 font-extrabold mb-4">
            Discover Amazing
          </div>
          <div className="lg:text-6xl md:text-5xl text-slate-200 font-bold mb-4">
            Rental Properties
          </div>
          <div className="lg:text-5xl md:text-4xl text-slate-200 mb-6">
            Near You
          </div>
          <div className="text-slate-300 w-96">
            "From cozy apartments to spacious houses, find rental properties
            that suit your needs. Start your journey towards a new home with
            just a few clicks."
          </div>
        </div>
        <div className="">
          <HomeInput />
        </div>
      </div>
      <div className="bg-violet-900 pb-16 lg:pt-5 md:pt-1 lg:mt-32 md:mt-10">
        <h1 className="text-center lg:text-5xl md:text-4xl text-white font-semibold mb-10">
          Search by Cities
        </h1>
        <div className="flex justify-center">
          <Link
            to="/rent?city=banglore"
            className="flex flex-col shadow-md shadow-white hover:shadow-lg hover:shadow-white bg-amber-600 rounded-lg lg:h-32 lg:w-32 md:h-24 md:w-24 invert mx-8"
          >
            <img className="h-24 w-24 mx-auto" src={bangloreLogo} />
            <h1 className="text-center text-xl font-semibold">Banglore</h1>
          </Link>
          <Link
            to="/rent?city=delhi"
            className="flex flex-col shadow-md shadow-white hover:shadow-lg hover:shadow-white bg-green-500 rounded-lg lg:h-32 lg:w-32 md:h-24 md:w-24 invert mx-8"
          >
            <img className="h-24 w-24 mx-auto" src={delhiLogo} />
            <h1 className="text-center text-xl font-semibold">Delhi</h1>
          </Link>
          <Link
            to="/rent?city=chennai"
            className="flex flex-col shadow-md shadow-white hover:shadow-lg hover:shadow-white bg-pink-400 rounded-lg lg:h-32 lg:w-32 md:h-24 md:w-24 invert mx-8"
          >
            <img className="h-24 w-24 mx-auto" src={chennaiLogo} />
            <h1 className="text-center text-xl font-semibold">Chennai</h1>
          </Link>
          <Link
            to="/rent?city=hyderabad"
            className="flex flex-col shadow-md shadow-white hover:shadow-lg hover:shadow-white bg-green-500 rounded-lg lg:h-32 lg:w-32 md:h-24 md:w-24 hue-rotate-60 invert mx-8"
          >
            <img className="h-24 w-24 mx-auto" src={hyderLogo} />
            <h1 className="text-center text-xl font-semibold">Hyderabad</h1>
          </Link>
          <Link
            to="/rent?city=mumbai"
            className="flex flex-col shadow-md shadow-white hover:shadow-lg hover:shadow-white bg-cyan-500 rounded-lg lg:h-32 lg:w-32 md:h-24 md:w-24 hue-rotate-60 invert mx-8"
          >
            <img className="h-24 w-24 mx-auto" src={mumbaiLogo} />
            <h1 className="text-center text-xl font-semibold">Mumbai</h1>
          </Link>
          <Link
            to="/rent?city=jaipur"
            className="flex flex-col shadow-md shadow-white hover:shadow-lg hover:shadow-white bg-yellow-500 rounded-lg lg:h-32 lg:w-32 md:h-24 md:w-24 invert mx-8"
          >
            <img className="h-24 w-24 mx-auto" src={jaipurLogo} />
            <h1 className="text-center text-xl font-semibold">Jaipur</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
