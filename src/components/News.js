import React from "react";

const HomeComp2 = ({ News, Image, title ,inNewspage}) => {
  return (
    <div className="w-full max-h-[70vh]   min-h-[70vh] bg-[white] py-10 my-10">
      <div className="flex flex-col lg:flex-row  justify-between px-[3%]  mx-auto ">
        <img src={Image} alt="" className="bg-cover max-w-[50%]  max-h-[50vh]" />
        <div className="flex flex-col w-full lg:w-[45%] ">
          <h2 className="font-Cairo text-4xl font-bold leading-[67.46px] text-right mb-3">
            {title}
          </h2>
          <p className="font-Cairo text-2xl font-semibold leading-[44.98px] text-right  line-clamp-[10]">
            {News}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeComp2;
