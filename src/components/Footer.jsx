import React from "react";
import logo1 from "../assets/ub 1.png";
import logo2 from "../assets/agaweed.png";
import logo3 from "../assets/gazl.png";

const Footer = () => {
  return (
    <div className="w-full max-md:h-[20vh] min-h-[250px] h-[30vh] bg-[#a18b6e] bottom-0 mb-0 ">
      <h1 className="text-white text-4xl pr-7 font-[800] mr-5 pt-5 text-right mb-3">
        شركاء النجاح{" "}
      </h1>
      <div className="max-md:h-[10vh] h-[20vh] flex flex-row-reverse  items-baseline justify-start pr-10 ">
        <img
          src={logo2}
          className="max-md:w-[50px] max-md:h-[50px] w-[130px] h-[130px] mx-[20px]  my-auto bg-white rounded-lg p-2 "
          alt="Logo2"
        />
        <img
          src={logo1}
          className="max-md:w-[50px] max-md:h-[50px] w-[130px] h-[130px] mx-[20px]  my-auto bg-white rounded-lg p-2"
          alt="Logo1"
        />

        <img
          src={logo3}
          className="max-md:w-[50px] max-md:h-[50px] w-[130px] h-[130px] mx-[20px]  my-auto bg-white rounded-lg p-2"
          alt="besha"
        />
      </div>
    </div>
  );
};

export default Footer;
