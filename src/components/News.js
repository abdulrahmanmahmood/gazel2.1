import React from "react";

const HomeComp2 = ({ News, Image, title }) => {
  return (
    <div className="w-full    min-h-[70vh] bg-[white] py-10 my-10">
      <div className="flex flex-col lg:flex-row  justify-between px-[3%]  mx-auto ">
        <img
          src={Image}
          alt=""
          className="bg-cover lg:max-w-[50%] min-w-[40%]  max-h-[50vh] min-h-[50vh]"
        />
        <div className="flex flex-col w-full lg:w-[45%] justify-between">
          <h2 className="font-Cairo text-4xl font-bold leading-[67.46px] text-right mb-3">
            {title}
          </h2>
          <p className="font-Cairo text-2xl font-semibold leading-[44.98px] text-right  line-clamp-[8] overflow-hidden">
            {News}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeComp2;
