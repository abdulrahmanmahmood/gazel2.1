import React from "react";

const CoplainCom = () => {
  return (
    <div className="flex flex-row-reverse justify-between px-3 py-3">
      <p className="font-Cairo font-[700] text-[20px] text-right">
        عبدالسلام محمد
      </p>
      <div className="flex flex-row-reverse gap-8">
        <button className="p-3 bg-[#CEB99E] rounded text-white">
          عرض الشكوى
        </button>
        <button className="px-9 py-3 bg-[#F5F5F5] rounded text-black">
          حذف
        </button>
      </div>
    </div>
  );
};

export default CoplainCom;
