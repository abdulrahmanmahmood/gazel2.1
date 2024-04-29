import React, { useState } from "react";
import Navheader from "./components/Navheader";
import HomeComp1 from "./components/HomeComp1";
import Footer from "./components/Footer";
import News from "./components/News";
import { newsData } from "./components/newsData";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const handleNextNews = () => {
    setCurrentNewsIndex((prevIndex) =>
      prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousNews = () => {
    setCurrentNewsIndex((prevIndex) =>
      prevIndex === 0 ? newsData.length - 1 : prevIndex - 1
    );
  };
  

  return (
    <div className="w-full bg-[#CEB99E]">
      <Navheader />
      <div className="pb-10 bg-white">
        <HomeComp1 />
      </div>
      <div className="my-[10px]">
        <h2 className="font-Cairo text-5xl font-bold leading-[67.46px] text-center my-[8vh]">
          الأخبار
        </h2>
      </div>
      <div className="carousel w-full relative my-10">
        {/* Rounded arrow icon for "previous" button */}
        <button
          className="absolute top-[50%] left-0 transform -translate-y-1/2 rounded-full bg-white p-2"
          onClick={handlePreviousNews}
        >
          <IoMdArrowDropleft className="text-6xl text-gray-800" />
        </button>
        {/* Normal "next" button */}
        <button
          className="absolute top-[50%] right-0 transform -translate-y-1/2 rounded-full bg-white p-2"
          onClick={handleNextNews}
        >
          <IoMdArrowDropright className="text-6xl text-gray-800" />
        </button>
        {/* Display current news */}
        <News
          Image={newsData[currentNewsIndex].Image}
          News={newsData[currentNewsIndex].News}
          title={newsData[currentNewsIndex].title}
        />
        {/* Dots for news items */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          {newsData.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === currentNewsIndex ? "bg-black" : "bg-gray-300"
              }`}
              onClick={() => setCurrentNewsIndex(index)}
            />
          ))}
        </div>
      </div>
      <button className="px-5 py-3 bg-white mx-auto  rounded-lg block my-auto text-center hover:bg-slate-50">
        <Link to={"/News"}>جميع الاخبار</Link>
      </button>
      <div className="w-full h-[10vh]" />
      <Footer />
    </div>
  );
};

export default Home;
