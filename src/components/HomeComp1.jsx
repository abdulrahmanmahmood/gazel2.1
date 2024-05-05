import React, { useState } from "react";
import cloudImag from "../assets/cloud.png";
import HomeImg1 from "../assets/homeImg1.png";
import Besha2 from "../assets/Besha2.jpeg";
import Besha3 from "../assets/Besha3.jpeg";

const HomeComp1 = () => {
  const images = [HomeImg1, Besha2];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVolunteerRegistration = () => {
    window.open("https://forms.gle/ubqVDhtUkKhVHix16", "_blank");
  };

  const handleHumanitarianRegistration = () => {
    window.open("https://forms.gle/xBZieWw92nT5hEMj7", "_blank");
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className="w-full bg-white  ">
      <div className="flex flex-col">
        <div className="lg:w-[50%] ml-auto pr-10 flex flex-row justify-between  p-3">
          <button
            className="px-8 py-2 bg-[#F5F5F5] font-Cairo  text-right rounded-lg"
            onClick={handleHumanitarianRegistration}
          >
            تسجيل حالتي الإنسانية
          </button>
          <button
            className="px-4 py-2 bg-[#CEB99E] text-white font-Cairo   text-right rounded-lg"
            onClick={handleVolunteerRegistration}
          >
            تسجيل المتطوعين
          </button>
        </div>
        <div className="flex flex-row px-[5%] mb-3 justify-between">
          <div className="flex flex-row">
            <img src={cloudImag} alt="" />
            <h3 className="items-baseline my-auto text-[24px] font-[700]">
              27 C محافظة بيشة
            </h3>
          </div>
          <h3 className="items-baseline my-auto text-[24px] font-[700]">
            تعريف بالموقع
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 mx-[3%]  justify-between md:gap-10  lg:h-[70vh]">
          <div className="col-span-3    max-md:w-full relative">
            <div>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={` lg:w-[80%] h-[70vh]  mx-auto rounded-lg ${
                    index === currentIndex ? "" : "hidden"
                  }`}
                />
              ))}
            </div>
            <div className="text-center text-5xl font-bold flex justify-center absolute bottom-0 left-0 w-full -mb-7">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full  mx-1 cursor-pointer ${
                    index === currentIndex ? "bg-black" : "bg-gray-400"
                  }`}
                  onClick={() => handleDotClick(index)}
                ></div>
              ))}
            </div>
          </div>

          <div className=" text-right  justify-between flex flex-col col-span-2 ">
            <p className=" text-xl   text-right p-3 my-3">
              نفذ فريق جزل التطوعي بالتعاون مع محافظة بيشة وجامعة بيشة فكرة موقع
              إلكتروني يهتم بالحالات الإنسانية والعمل التطوعي بالمحافظة من خلال
              متابعة الاعمال عبر خريطة تفاعلية يسهل الإجراءات ويميز هذا الموقع
              بالشفافية والوضح الكاملة للمسؤول , وسهولة معرفة الفرص التطوعية
              والاعمال الإنسانية واخر اخبارها بالمحافظة .
            </p>
            <h3 className="font-Cairo text-2xl font-bold leading-11 text-right px-3 ">
              كيف يمكنني تسجيل حالتي الإنسانية ؟
            </h3>
            <p className="font-Cairo text-xl  leading-11 text-right p-3 my-3">
              يمكنك تسجيل حالتك الإنسانية عبر خانة التسجيل في " الرئيسية " حيث
              ستصل للجهات ذات العلاقة حكومية كانت او أهلية ويمكن التفاعل معها
              عبر القطاع الثالث
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComp1;
