import React from "react";
import Navheader from "./components/Navheader";
import { newsData } from "./components/newsData";
import News from "./components/News";
import Footer from "./components/Footer";

const NewsPage = () => {
  return (
    <div className="w-full bg-[#CEB99E]">
      <Navheader />
      {newsData.map((item, index) => (
        <div className="w-full  bg-[white] py-10 my-10" key={index}>
          <div className="flex flex-col lg:flex-row  justify-between px-[3%]  mx-auto ">
            <img
              src={item.Image}
              alt=""
              className="bg-cover max-w-[50%]  max-h-[50vh]"
            />
            <div className="flex flex-col w-full lg:w-[45%] ">
              <h2 className="font-Cairo text-3xl font-bold leading-[67.46px] text-right">
                {item.title}
              </h2>
              <p className="font-Cairo text-2xl font-[500] leading-[44.98px] text-right  line-clamp-[10]">
                {item.News}
              </p>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default NewsPage;
